<?php
/**
 * Usage:
 *     php swagger-yaml-to-html.php < /path/to/api.yaml > doc.html
 *
 * PHP port of swagger-yaml-to-html.py. Requires the yaml extension (pecl install yaml).
 */

$template = <<<'HTML'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Swagger UI</title>
  <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700|Source+Code+Pro:300,600|Titillium+Web:400,600,700" rel="stylesheet">
  <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/3.43.0/swagger-ui.css" >
  <style>
    html
    {
      box-sizing: border-box;
      overflow: -moz-scrollbars-vertical;
      overflow-y: scroll;
    }
    *,
    *:before,
    *:after
    {
      box-sizing: inherit;
    }
    body {
      margin:0;
      background: #fafafa;
    }
  </style>
</head>
<body>
<div id="swagger-ui"></div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/3.43.0/swagger-ui-bundle.js"> </script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/3.43.0/swagger-ui-standalone-preset.js"> </script>
<script>
window.onload = function() {
  var spec = {{SPEC}};
  // Build a system
  const ui = SwaggerUIBundle({
    spec: spec,
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout"
  })
  window.ui = ui
}
</script>
</body>
</html>
HTML;

// Warnings go to stderr and stop the conversion, so they can neither end up in the
// HTML nor hide a part of the spec that could not be read.
ini_set('display_errors', 'stderr');
set_error_handler(function ($severity, $message) {
    fwrite(STDERR, "Error: $message\n");
    exit(1);
});

$yaml = stream_get_contents(STDIN);

// The yaml extension follows YAML 1.1 a little differently from PyYAML, which the
// Python version uses. These callbacks make both versions read a spec the same way.
const NUMBER_MARKER = '__swagger_yaml_to_html_number__:';
$pyyaml_true = ['yes', 'Yes', 'YES', 'true', 'True', 'TRUE', 'on', 'On', 'ON'];
$pyyaml_false = ['no', 'No', 'NO', 'false', 'False', 'FALSE', 'off', 'Off', 'OFF'];
$callbacks = [
    // Keep an empty mapping ({}) an object in JSON instead of an empty array ([]).
    // Non-empty mappings stay arrays so that merge keys (<<) keep working.
    'tag:yaml.org,2002:map' => function ($value) {
        return ($value === [] || array_is_list($value)) ? (object) $value : $value;
    },
    // "y", "n", "Y" and "N" are strings, as in PyYAML (a property named "y" stays "y").
    'tag:yaml.org,2002:bool' => function ($value) use ($pyyaml_true, $pyyaml_false) {
        if (in_array($value, $pyyaml_true, true)) {
            return true;
        }
        if (in_array($value, $pyyaml_false, true)) {
            return false;
        }
        return $value;
    },
    // Integers too large for PHP are written as written instead of wrapping around.
    'tag:yaml.org,2002:int' => function ($value) {
        $digits = str_replace('_', '', $value);
        if (preg_match('/^[-+]?(0|[1-9][0-9]*)$/', $digits)) {
            $int = filter_var($digits, FILTER_VALIDATE_INT);
            return $int === false ? NUMBER_MARKER . ltrim($digits, '+') : $int;
        }
        return yaml_parse($value);
    },
    // .inf and .nan cannot be JSON-encoded; write them as JavaScript literals.
    'tag:yaml.org,2002:float' => function ($value) {
        $number = yaml_parse($value);
        if (is_nan($number)) {
            return NUMBER_MARKER . 'NaN';
        }
        if (is_infinite($number)) {
            return NUMBER_MARKER . ($number > 0 ? 'Infinity' : '-Infinity');
        }
        return $number;
    },
];
$docs = yaml_parse($yaml, -1, $ndocs, $callbacks);
if ($docs === false) {
    fwrite(STDERR, "Failed to parse YAML from stdin\n");
    exit(1);
}
if (count($docs) !== 1) {
    fwrite(STDERR, "Expected a single YAML document, got " . count($docs) . "\n");
    exit(1);
}
$spec = $docs[0];

// Key order follows the YAML file. "<", ">" and "&" are written as \u escapes so that
// text such as "</script>" or "<!--<script>" inside the spec cannot end or confuse the
// inline script block.
try {
    $json = json_encode($spec, JSON_HEX_TAG | JSON_HEX_AMP | JSON_THROW_ON_ERROR);
} catch (JsonException $e) {
    fwrite(STDERR, "Failed to encode the spec as JSON: " . $e->getMessage() . "\n");
    exit(1);
}
// Numbers that json_encode cannot write become plain numbers as values and plain
// strings as keys (as in the Python version).
$marker = preg_quote(NUMBER_MARKER, '/');
$json = preg_replace('/"' . $marker . '(-?[0-9]+|NaN|-?Infinity)":/', '"$1":', $json);
$json = preg_replace('/"' . $marker . '(-?[0-9]+|NaN|-?Infinity)"/', '$1', $json);

echo str_replace('{{SPEC}}', $json, $template);

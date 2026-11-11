#!/usr/bin/python
#
#  Copyright 2017 Otto Seiskari
#  Licensed under the Apache License, Version 2.0.
#  See http://www.apache.org/licenses/LICENSE-2.0 for the full text.
#
#  This file is based on
#  https://github.com/swagger-api/swagger-ui/blob/4f1772f6544699bc748299bd65f7ae2112777abc/dist/index.html
#  (Copyright 2017 SmartBear Software, Licensed under Apache 2.0)
#
"""
Usage:
    python swagger-yaml-to-html.py < /path/to/api.yaml > doc.html
"""
import json, sys
import yaml

TEMPLATE = """
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Swagger UI</title>
  <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700|Source+Code+Pro:300,600|Titillium+Web:400,600,700" rel="stylesheet">
  <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.29.1/swagger-ui.css" integrity="sha512-eZpfl9qlKnbDvlJ2brfdx3nhlP1FMsA23w65motxKdYsUcfMcdO2bcLPr7mXhvyzmDZwuzYCJKrl/sEo1ditVQ==" crossorigin="anonymous" referrerpolicy="no-referrer">
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
<script src="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.29.1/swagger-ui-bundle.js" integrity="sha512-iDdi6WwSTimAFh1NhPyFZpHJWr16m/PupHztElqQL+gQoQDavUATsP9hcvgs9Yci+EUA//WvZYZsCTDhRDKc3g==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.29.1/swagger-ui-standalone-preset.js" integrity="sha512-oGq+mP+3XUyYDm9vsprsd6YdhOokdkcLNUZnmEE6HJzG0F9fIaB8kgGZsjdfTWN8w/1f2kN4a/0xkla0hsetcQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script>
window.onload = function() {
  var spec = %s;
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
    layout: "StandaloneLayout",
    // Do not let ?url= / ?configUrl= in the address bar replace the embedded spec.
    queryConfigEnabled: false
  })
  window.ui = ui
}
</script>
</body>
</html>
"""


class SpecLoader(yaml.SafeLoader):
    """SafeLoader that keeps timestamps and !!binary values as the strings written in
    the file, so that they can always be written out as JSON unchanged."""


SpecLoader.add_constructor("tag:yaml.org,2002:timestamp", SpecLoader.construct_scalar)
SpecLoader.add_constructor("tag:yaml.org,2002:binary", SpecLoader.construct_scalar)


def spec_to_js(spec):
    # Key order follows the YAML file (dicts keep insertion order).
    # "<", ">" and "&" are written as \u escapes so that text such as "</script>" or
    # "<!--<script>" inside the spec cannot end or confuse the inline script block.
    return (json.dumps(spec)
            .replace("<", "\\u003c")
            .replace(">", "\\u003e")
            .replace("&", "\\u0026"))


if __name__ == "__main__":
    spec = yaml.load(sys.stdin, Loader=SpecLoader)
    sys.stdout.write(TEMPLATE % spec_to_js(spec))

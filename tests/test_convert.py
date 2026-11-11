"""Tests for the YAML -> HTML converters.

Run with:  python -m unittest discover -s tests -v

The converter command can be overridden with the CONVERTER environment
variable, so the same tests run against the PHP script or a Docker image:

    CONVERTER="php swagger-yaml-to-html.php" python -m unittest discover -s tests
    CONVERTER="docker run --rm -i swagger-yaml-to-html" python -m unittest discover -s tests
"""
import json
import os
import re
import shlex
import subprocess
import sys
import unittest

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FIXTURES = os.path.join(ROOT, "tests", "fixtures")
DEFAULT_CONVERTER = [sys.executable, os.path.join(ROOT, "swagger-yaml-to-html.py")]


def converter():
    cmd = os.environ.get("CONVERTER")
    return shlex.split(cmd) if cmd else DEFAULT_CONVERTER


def convert(path):
    with open(path, "rb") as f:
        result = subprocess.run(converter(), stdin=f, stdout=subprocess.PIPE,
                                stderr=subprocess.PIPE, cwd=ROOT, timeout=120)
    if result.returncode != 0:
        raise AssertionError("converter failed (%d): %s" % (
            result.returncode, result.stderr.decode("utf-8", "replace")))
    return result.stdout.decode("utf-8")


def embedded_spec(html):
    match = re.search(r"^\s*var spec = (.*);\s*$", html, re.MULTILINE)
    if not match:
        raise AssertionError("no `var spec = ...;` line in output")
    # object_pairs_hook keeps the keys as an ordered list of pairs.
    return json.loads(match.group(1), object_pairs_hook=lambda pairs: pairs)


def as_dict(pairs):
    return {k: v for k, v in pairs}


def lookup(pairs, *keys):
    for key in keys:
        pairs = as_dict(pairs)[key] if not isinstance(key, int) else pairs[key]
    return pairs


class ConvertTest(unittest.TestCase):
    def test_petstore_produces_swagger_ui_page(self):
        html = convert(os.path.join(ROOT, "petstore.yaml"))
        self.assertIn('<div id="swagger-ui"></div>', html)
        self.assertIn("swagger-ui-bundle.js", html)
        spec = embedded_spec(html)
        self.assertEqual(lookup(spec, "info", "title"), "Swagger Petstore")
        self.assertEqual([k for k, _ in lookup(spec, "paths")], ["/pets", "/pets/{petId}"])

    def test_swagger_ui_assets(self):
        # https://github.com/yousan/swagger-yaml-to-html/issues/14 : Swagger UI before
        # 5.0 cannot render OpenAPI 3.1, and before 4.1.3 it is affected by CVE-2021-46708.
        html = convert(os.path.join(ROOT, "petstore.yaml"))
        tags = re.findall(r"<(?:script|link)[^>]*swagger-ui/[^>]*>", html)
        self.assertEqual(len(tags), 3)
        versions = {re.search(r"swagger-ui/([0-9.]+)/", tag).group(1) for tag in tags}
        self.assertEqual(len(versions), 1, versions)
        self.assertGreaterEqual(tuple(int(n) for n in versions.pop().split(".")), (5, 0, 0))
        for tag in tags:
            self.assertRegex(tag, r'integrity="sha(256|384|512)-')
        self.assertIn("queryConfigEnabled: false", html)

    def test_key_order_is_preserved(self):
        # Regression guard for https://github.com/yousan/swagger-yaml-to-html/issues/5 :
        # keys must reach Swagger UI in the order they are written in the YAML file.
        spec = embedded_spec(convert(os.path.join(FIXTURES, "key-order.yaml")))
        media = lookup(spec, "paths", "/order", "get", "responses", "200",
                       "content", "application/json")
        self.assertEqual([k for k, _ in lookup(media, "schema", "properties")],
                         ["zeta", "alpha", "mike"])
        example = lookup(media, "example")
        self.assertEqual([k for k, _ in example], ["param1", "object2"])
        self.assertEqual([k for k, _ in lookup(example, "object2", 0)], ["param", "objects"])

    def test_dates_are_kept_as_written(self):
        spec = embedded_spec(convert(os.path.join(FIXTURES, "dates.yaml")))
        self.assertEqual(lookup(spec, "x-changelog"), [("2020-01-01", "initial")])
        example = lookup(spec, "paths", "/dates", "get", "responses", "200",
                         "content", "application/json", "example")
        self.assertEqual(example, [("created", "2020-01-02"),
                                   ("updated", "2020-01-02T03:04:05Z"),
                                   ("local", "2020-01-02T03:04:05.5+09:00")])

    def test_empty_mapping_stays_an_object(self):
        html = convert(os.path.join(FIXTURES, "script-tag.yaml"))
        self.assertRegex(html, r'"paths":\s*\{\}')

    def test_yaml_types_are_read_like_pyyaml(self):
        spec = embedded_spec(convert(os.path.join(FIXTURES, "yaml-types.yaml")))
        point = lookup(spec, "components", "schemas", "Point")
        # Merge keys (<<) are applied; later keys win.
        self.assertEqual(lookup(point, "type"), "object")
        self.assertEqual(lookup(point, "description"), "point")
        # "y" and "n" are property names, not booleans.
        self.assertEqual([k for k, _ in lookup(point, "properties")], ["x", "y", "n"])
        values = lookup(spec, "x-values")
        self.assertEqual(lookup(values, "flags"),
                         ["y", "n", True, False, True, False, True, False])
        self.assertEqual(lookup(values, "int64-max"), 9223372036854775807)
        self.assertEqual(lookup(values, "uint64-max"), 18446744073709551615)
        self.assertEqual(lookup(values, "octal"), 15)
        self.assertEqual(lookup(values, "hex"), 31)
        self.assertEqual(lookup(values, "underscore"), 1000)
        self.assertEqual(lookup(values, "infinite"), float("inf"))
        self.assertEqual(lookup(values, "empty-map"), [])  # [] of pairs == {}
        self.assertRegex(convert(os.path.join(FIXTURES, "yaml-types.yaml")),
                         r'"empty-map":\s*\{\},\s*"empty-list":\s*\[\]')

    def test_html_in_spec_does_not_break_page(self):
        html = convert(os.path.join(FIXTURES, "script-tag.yaml"))
        # Only the template's own </script> tags may appear in the output,
        # and the embedded JSON must not contain any raw "<".
        self.assertEqual(html.lower().count("</script>"), 3)
        spec_line = re.search(r"^\s*var spec = .*$", html, re.MULTILINE).group(0)
        self.assertNotIn("<", spec_line)
        spec = embedded_spec(html)
        self.assertEqual(
            lookup(spec, "info", "description"),
            "Mentions </script><script>window.injected = true</script> and <!--<script> & co.")


if __name__ == "__main__":
    unittest.main()

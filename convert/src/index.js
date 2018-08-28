"use strict";
exports.__esModule = true;
var axios = require("axios");
var SwaggerUIBundle_1 = require("SwaggerUIBundle");
var presets = SwaggerUIBundle_1.SwaggerUIBundle.presets;
// require("swagger-ui-dist/swagger-ui.css");

// import {SwaggerUIBundle, SwaggerUIStandalonePreset} from "./@types/SwaggerUIBundle";
//import * as SwaggerUIBundle from 'SwaggerUIBundle'
// import * as SwaggerUIStandalonePreset from 'SwaggerUIStandalonePreset'
// declare var yaml_data: string;
// console.log('am I loaded?');
// declare function syth(): void;
var syth = function () {
    try {
        // const doc = yaml.safeLoad(fs.readFileSync('/home/ixti/example.yml', 'utf8'));
        var url = 'https://raw.githubusercontent.com/yousan/swagger-yaml-to-html/master/petstore.yaml';
        // const body = request(url).pipe();
        var options = {
            // uri: baseUrl + queryString,
            uri: url
        };
        return axios["default"].get(url)
            .then(function (response) {
            var spec = JSON.stringify(response.data);
            // const options: SwaggerUIBundle.Options= new SwaggerUIBundle.Options();
            var options = {
                spec: spec,
                dom_id: '#swagger-ui',
                deepLinking: true,
                presets: [
                    SwaggerUIBundle_1.SwaggerUIBundle.presets.apis,
                ],
                plugins: [
                    SwaggerUIBundle_1.SwaggerUIBundle.plugins.DownloadUrl
                ],
                layout: "StandaloneLayout"
            };
            var ui = SwaggerUIBundle_1.SwaggerUIBundle(options);
            // const ui = SwaggerUIBundle({
            //     spec: spec,
            //     dom_id: '#swagger-ui',
            //     deepLinking: true,
            //     presets: [
            //         SwaggerUIBundle.presets.apis,
            //         SwaggerUIStandalonePreset
            //     ],
            //     plugins: [
            //         SwaggerUIBundle.plugins.DownloadUrl
            //     ],
            //     layout: "StandaloneLayout"
            // });
            // return response.data;
            // yaml_data = response.data;
            // console.log(response.data)
            // return
        })["catch"](function (error) { return console.log(error); });
        // const result = await request.get(options);
        // console.log(result);
        // console.log(JSON.stringify(yaml.load(result)));
    }
    catch (e) {
        // console.log(e);
    }
};

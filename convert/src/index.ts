import * as yaml from 'js-yaml';
import * as axios from 'axios';
import * as SwaggerUIBundle from 'swagger-ui-dist'
// import {IOptions, SwaggerUIBundle} from 'SwaggerUIBundle'

// import { SwaggerUIBundle } from 'SwaggerUIBundle'
// const { presets } = SwaggerUIBundle;
// import 'swagger-ui-dist/swagger-ui.css';

// import {SwaggerUIBundle, SwaggerUIStandalonePreset} from "./@types/SwaggerUIBundle";
// import * as SwaggerUIBundle from 'SwaggerUIBundle'
// import * as SwaggerUIStandalonePreset from 'SwaggerUIStandalonePreset'

// declare var yaml_data: string;
// console.log('am I loaded?');

// declare function syth(): void;

const  syth = function () {
    try {
        // const doc = yaml.safeLoad(fs.readFileSync('/home/ixti/example.yml', 'utf8'));
        const url: string = 'https://raw.githubusercontent.com/yousan/swagger-yaml-to-html/master/petstore.yaml';
        // const body = request(url).pipe();

        let options = {
            // uri: baseUrl + queryString,
            uri: url,
        };

        return axios.default.get(url)
            .then((response) => {
                const spec: string = JSON.stringify(response.data);
                // const options: SwaggerUIBundle.Options= new SwaggerUIBundle.Options();
                const options: Object = {
                        spec: spec,
                        dom_id: '#swagger-ui',
                        deepLinking: true,
                        presets: [
                            // SwaggerUIBundle.presets.apis,
                            // SwaggerUIStandalonePreset
                        ],
                        plugins: [
                            // SwaggerUIBundle.plugins.DownloadUrl
                        ],
                        layout: "StandaloneLayout"
                    };

                const ui = SwaggerUIBundle({});

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
            })
            .catch((error) => console.log(error))

        // const result = await request.get(options);
        // console.log(result);
        // console.log(JSON.stringify(yaml.load(result)));
    } catch (e) {
        // console.log(e);
    }
};

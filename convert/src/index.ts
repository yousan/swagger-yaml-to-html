import * as yaml from 'js-yaml';
import * as axios from 'axios';

// declare var yaml_data: string;
// console.log('am I loaded?');

// declare function syth(): void;

export  syth = function () {
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

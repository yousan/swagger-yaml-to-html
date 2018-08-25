import * as yaml from 'js-yaml';
import * as request from "request-promise-native";
import {CoreOptions} from "request";


const main = async function () {
    try {
        // const doc = yaml.safeLoad(fs.readFileSync('/home/ixti/example.yml', 'utf8'));
        const url: string = 'https://raw.githubusercontent.com/yousan/swagger-yaml-to-html/master/petstore.yaml';
        // const body = request(url).pipe();

        const baseUrl = 'https://www.random.org/integers';
        const queryString = '?num=100&min=1&max=100&col=5&base=10&format=html&rnd=new';
        let options = {
            // uri: baseUrl + queryString,
            uri: url,
        };

        const result = await request.get(options);
        // console.log(result);
        // console.log(JSON.stringify(yaml.load(result)));
    } catch (e) {
        // console.log(e);
    }
};
main();

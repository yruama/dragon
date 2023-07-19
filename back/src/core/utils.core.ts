import axios from "axios";
import fs from "fs";

export default class Core_Utils {

    constructor() {
    }

    async downloadImage(url: string, filename: string) {
        console.log("'./src/assets/' + filename => ", './src/assets/' + filename)
        const response = await axios.get(url, { responseType: 'arraybuffer' });

        

        fs.writeFile('./src/assets/' + filename, response.data, (err) => {
            if (err) throw err;
            else return true;
        });
    }

    successFormat(result: any) {
        return {
            status: 'success',
            result
        }
    }

    errorFormat(message: string, code: any = -1) {
        return {
            status: 'error',
            message,
            code
        }
    }
}
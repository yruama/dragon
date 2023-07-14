import axios from "axios";
import fs from "fs";

export default class Core_Utils {

    constructor() {
        console.log("Core_Utils constructor");
    }

    async downloadImage(url: string, filename: string) {
        const response = await axios.get(url, { responseType: 'arraybuffer' });

        fs.writeFile('./src/assets/' + filename, response.data, (err) => {
            if (err) throw err;
        });
    }
}
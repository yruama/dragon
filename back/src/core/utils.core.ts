import axios from "axios";
import fs from "fs";
import { APIResultError, APIResultSuccess } from "@type/utils";

export default class Core_Utils {
	async downloadImage(url: string, filename: string): Promise<void> {
		console.log("'./src/assets/' + filename => ", "./src/assets/" + filename);
		const response = await axios.get(url, { responseType: "arraybuffer" });

		fs.writeFile("./src/assets/" + filename, response.data, err => {
			if (err != null) throw err;
			else return true;
		});
	}

	successFormat(result: any): APIResultSuccess {
		return {
			status: "success",
			result
		};
	}

	errorFormat(message: string, code: any = -1): APIResultError {
		return {
			status: "error",
			message,
			code
		};
	}
}

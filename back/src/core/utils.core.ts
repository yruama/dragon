import axios from "axios";
import fs from "fs";

const downloadImage = async(url: string, filename: string): Promise<void> => {
	console.log("'./src/assets/' + filename => ", "./src/assets/" + filename);
	const response = await axios.get(url, { responseType: "arraybuffer" });

	fs.writeFile("./src/assets/" + filename, response.data, err => {
		if (err != null) throw err;
		else return true;
	});
};

export { downloadImage };

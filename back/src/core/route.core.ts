import { APIResultSuccess, APIResultError } from "@type/route";

const successFormat = (result: any): APIResultSuccess => {
	return {
		status: "success",
		result
	};
};

const errorFormat = (message: unknown, code: number = -1): APIResultError => {
	return {
		status: "error",
		message,
		code
	};
};

export { successFormat, errorFormat };

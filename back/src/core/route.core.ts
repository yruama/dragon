import httpCommon from "@http/common.json";
import { FastifyReply } from "fastify";

const replySuccess = async (result: any, replyObj: FastifyReply, restVerb: string): Promise<void> => {
	try {
		let code = httpCommon.SUCCESS.ok.code;

		switch (restVerb) {
			case "post":
				code = httpCommon.SUCCESS.created.code;
				break;
			case "put":
				code = httpCommon.SUCCESS.created.code;
				break;
			case "patch":
				code = httpCommon.SUCCESS.created.code;
			case "delete":
				code = httpCommon.SUCCESS.no_content.code;
				break;
			default:
				code = httpCommon.SUCCESS.ok.code;
				break;
		}

		replyObj.statusCode = code;
		await replyObj.send(result);
	} catch (error) {
		console.error("[ReplySuccess] Error: ", error);
		await replyError(httpCommon.SERVER_ERROR.internal_server_error, replyObj);
	}
};

const replyError = async (error: any, replyObj: FastifyReply): Promise<void> => {
	if (error instanceof InternalError) {
		let { errorObj } = error;

		if (!errorObj) {
			errorObj = httpCommon.SERVER_ERROR.internal_server_error;
		}

		replyObj.statusCode = errorObj.code;
		await replyObj.send({
			message: errorObj.message,
			description: errorObj.description
		});
	}
};

export class ErrorResponse {
	constructor(
		public message: string,
		public status: number
	) {}
}

export { replySuccess, replyError };

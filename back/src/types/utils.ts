export interface APIResult {
	status: "success" | "error"; // can only be one of these
	result: any;
	message: any;
	code: number;
}

export type APIResultError = Pick<APIResult, "status" | "message" | "code">;
export type APIResultSuccess = Pick<APIResult, "status" | "result">;

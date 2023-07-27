class InternalError extends Error {
	errorObj: ErrorObj;
	constructor(errorObj: ErrorObj) {
		super();
		this.errorObj = errorObj;
	}
}

export const setGlobals = (): void => {
	(global as any).InternalError = InternalError;
};

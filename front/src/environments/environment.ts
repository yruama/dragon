interface Environment {
	production: boolean;
	environmentName: string;
	apiURL: string;
	assetsURL: string;
}

export const environment: Environment = {
	production: false,
	environmentName: "",
	apiURL: "",
	assetsURL: ""
};

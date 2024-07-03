interface Environment {
	production: boolean;
	environmentName: string;
	apiURL: string;
	assetsURL: string;
	POKEMONTCG_API_KEY: string;
}

export const environment: Environment = {
	production: false,
	environmentName: "",
	apiURL: "",
	assetsURL: "",
	POKEMONTCG_API_KEY: ''
};

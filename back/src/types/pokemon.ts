export interface PokeInfos {
	height: number;
	statistics: string;
	weight: number;
}

export interface Pokemon {
	ID?: number;
	POKEMON_ID: number;
	NAME_FR: string;
	NAME_EN: string;
	DESCRIPTION_FR: string;
	DESCRIPTION_EN: string;
	CATEGORY: string;
	TYPE_1_ID: number;
	TYPE_2_ID: number;
	TALENT: string;
	SHAPE: number;
	GENERATION: number;
	INFORMATION: PokeInfos;
	EVOLUTION: number;
	COLOR: string;
	artwork: string;
	miniature: string;
}

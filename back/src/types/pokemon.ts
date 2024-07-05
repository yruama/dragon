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
	TYPE_ID_1: number;
	TYPE_ID_2: number;
	TALENT: string;
	SHAPE: number;
	GENERATION: number;
	INFORMATION: PokeInfos;
	EVOLUTION: number;
	COLOR: string;
	artwork: string;
	miniature: string;
}

export interface PokemonWithTypeData extends Pokemon {
	TYPE_1_NAME?: string;
	TYPE_2_NAME?: string;
  }
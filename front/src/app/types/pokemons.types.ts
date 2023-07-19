export interface Pokemon {
    ID?             : number,
    POKEMON_ID      : number,
    NAME_FR         : string,
    NAME_EN         : string,
    DESCRIPTION_FR  : string
    DESCRIPTION_EN  : string
    CATEGORY        : string,
    TYPE_ID_1       : number,
    TYPE_ID_2       : number,
    TALENT          : string,
    SHAPE           : string,
    GENERATION      : number,
    INFORMATION     : PokeInformations,
    EVOLUTION       : number,
    COLOR           : string,
    owned           : boolean
}

export interface PokeKeyName {
    name:       string,
    language:   string
}

export interface PokeStats {
    value:  number,
    name:   string
}

export interface PokeInformations {
   height:      number,
   weight:      number,
   statistics: string
}
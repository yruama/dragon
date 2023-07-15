export interface Pokemon {
    INFORMATIONS:   PokeInformations,
    POKEMON_ID:     number,
    NAME:           PokeKeyName[],
    STATISTICS:     PokeStats[]
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
   category:    PokeKeyName[],
   type:        { name: string }[]
}
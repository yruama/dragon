export interface PokeInfos {
    height: number,
    category: string,
    weight: number,
    type: string[]
}

export interface Pokemon {
    id          : number,
    name        : string,
    artwork     : string,
    miniature   : spring,
    statistics  : string,
    generation  : string,
    informations: PokeInfos
}
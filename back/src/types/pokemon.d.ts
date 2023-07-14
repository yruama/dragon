export interface PokeInfos {
    height: number,
    category: string,
    weight: number,
    type: string[]
}

export interface Pokemon {
    id          : number,
    name        : string,
    sprite      : spring,
    statistics  : string,
    generation  : string,
    informations: PokeInfos
}
export enum PokemonTypes {
    BUG = 'bug',
    DARK = 'dark',
    DRAGON = 'dragon',
    ELECTRIC = 'electric',
    FAIRY = 'fairy',
    FIGHTING = 'fighting',
    FIRE = 'fire',
    FLYING = 'flying',
    GHOST = 'ghost',
    GRASS = 'grass',
    GROUND = 'ground',
    ICE = 'ice',
    NORMAL = 'normal',
    POISON = 'poison',
    PSYCHIC = 'psychic',
    ROCK = 'rock',
    STEEL = 'steel',
    WATER = 'water'
}

export const PokemonTypeColors = {
    [PokemonTypes.BUG]: '#C62828',
    [PokemonTypes.DARK]: '#D32F2F',
    [PokemonTypes.DRAGON]: 'blue',
    [PokemonTypes.ELECTRIC]: 'orange',
    [PokemonTypes.FAIRY]: 'orange',
    [PokemonTypes.FIGHTING]: 'orange',
    [PokemonTypes.FIRE]: 'orange',
    [PokemonTypes.FLYING]: 'orange',
    [PokemonTypes.GHOST]: 'orange',
    [PokemonTypes.GRASS]: 'orange',
    [PokemonTypes.GROUND]: 'orange',
    [PokemonTypes.ICE]: 'orange',
    [PokemonTypes.NORMAL]: 'orange',
    [PokemonTypes.POISON]: 'orange',
    [PokemonTypes.PSYCHIC]: 'orange',
    [PokemonTypes.ROCK]: 'orange',
    [PokemonTypes.STEEL]: 'orange',
    [PokemonTypes.WATER]: 'orange',
}

export const getTypes: string[] = Object.values(PokemonTypes);

export const getTypeColor = (type: string): PokemonTypes =>
    Object.values(PokemonTypes).find(statType =>
        type.toLowerCase() === statType
    )
export enum PokemonStatTypes {
    HP = 'hp',
    Attack = 'attack',
    Defense = 'defense',
    SpecialAttack = 'special-attack',
    SpecialDefense = 'special-defense',
    Speed = 'speed'
}
  
export const PokemonStatColors = {
    [PokemonStatTypes.HP]: '#C62828',
    [PokemonStatTypes.Attack]: '#D32F2F',
    [PokemonStatTypes.Defense]: 'blue',
    [PokemonStatTypes.SpecialAttack]: 'orange',
    [PokemonStatTypes.SpecialDefense]: '#00C853',
    [PokemonStatTypes.Speed]: '#FFEA00',
}

export const PokemonStatIcons = {
    [PokemonStatTypes.HP]: 'health',
    [PokemonStatTypes.Attack]: 'attack',
    [PokemonStatTypes.Defense]: 'defense',
    [PokemonStatTypes.SpecialAttack]: 'attack',
    [PokemonStatTypes.SpecialDefense]: 'defense',
    [PokemonStatTypes.Speed]: 'speed',
}

export const getStatIcon = (stat: string): PokemonStatTypes =>
    Object.values(PokemonStatTypes).find(statType =>
        stat.toLowerCase() === statType
    )

export const getStatColor = (stat: string): PokemonStatTypes =>
    Object.values(PokemonStatTypes).find(statType =>
        stat.toLowerCase() === statType
    )
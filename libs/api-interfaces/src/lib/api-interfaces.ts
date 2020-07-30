export interface Pokemon {
  id: string,
  name: string,

  url?: string,

  abilities?: [],
  base_experience?: number,
  forms?: [],
  height?: number,
  held_items?: [],
  is_default?: boolean,
  location_area_encounters?: string,
  moves?: [],
  species?: {},
  sprites?: {
    back_default: string,
    back_female: string,
    back_shiny: string,
    back_shiny_female: string,
    front_default: string,
    front_female: string,
    front_shiny: string,
    front_shiny_female: string,
  },
  stats?: PokemonStat[],
  types?: PokemonType[],
  weight?: number,
}

export interface PokemonType {
  slot: number,
  type: {
    name: string,
    url: string,
  }
}

export interface PokemonStat {
  base_stat: number,
  effort: number,
  stat: {
    name: string,
    url: string,
  }
}

export interface PokemonApiObj {
  count: number,
  next: string,
  previous: string,
  results: Pokemon[]
}

export interface PokemonTrainer {
  id: string,
  name: string,
  pokemons?: string[]
}

export interface Login {
  "id": string,
  "username": string,
  "password": string,
}

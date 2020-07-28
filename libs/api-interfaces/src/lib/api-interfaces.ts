export interface Message {
  message: string;
}

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
  stats?: [],
  types?: [],
  weight?: number,
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

export interface Pet {
  id: string,
  name: string,
  species: string,
  breed: string,
  furColor: string,
  weight: number
}

export interface Burger {
  id: string,
  bun: string,
  patty: string,
  cheese: string,
  toppings: string[]
}

export interface Restaurant {
  id: string,
  name: string,
  serviceType: string,
  foodType: string,
  price: number,
  quality: number
}

export interface Bike {
  "id": string,
  "brand": string,
  "year": number,
  "style": string,
  "extras": string[]
}

export interface Chair {
  id: string,
  legs: number,
  backing: boolean,
  seatShape: string,
  type: string
}

export interface Cheese {
  id: string,
  name: string,
  description: string,
  rating: number,
  price: number
}

export interface Fruit {
  "id": string,
  "name": string,
  "description": string,
  "color": string,
  "favorite": boolean,
  "icon" : string,
  "amount": number,
}

export interface Lesson {
  "id": string,
  "title": string,
  "description": string,
  "favorite": boolean,
  "percentComplete": number,
}

export interface TvShow {
  "id": string,
  "name": string,
  "description": string,
  "type": string,
  "price": number,
  "stars": number,
}

export interface Game {
  "id": string,
  "name": string,
  "description": string,
  "rating": string,
  "price": number,
}

export interface Pizza {
  "id": string,
  "sauce": string,
  "cheese": string,
  "crust": string,
  "extras": string[],
  "price": number,
}

export interface Computer {
  "id": string,
  "cpu": string,
  "gpu": string,
  "ram": number,
  "extras": string[],
  "price": number,
}

export interface Car {
  "id": string,
  "type": string,
  "description": string,
  "color": string,
  "price": number,
}

export interface Login {
  "id": string,
  "username": string,
  "password": string,
}

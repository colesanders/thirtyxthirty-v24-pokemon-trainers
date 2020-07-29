import { Pokemon } from '@thirty/api-interfaces';
import { createAction, props } from '@ngrx/store';

export const resetSelectedPokemon = createAction('[Pokemons] Reset Selected Pokemon');
export const resetPokemons = createAction('[Pokemons] Reset Pokemons');

// Select Pokemon
export const selectPokemon = createAction(
  '[Pokemons] Select Pokemon',
  props<{ selectedId: string }>()
);

// Load Pokemons
export const loadPokemons = createAction('[Pokemons] Load Pokemons');

export const loadPokemonsSuccess = createAction(
  '[Pokemons] Load Pokemons Success',
  props<{ pokemons: Pokemon[] }>()
);

export const loadPokemonsFailure = createAction(
  '[Pokemons] Load Pokemons Failure',
  props<{ error: any }>()
);

// Load Many Pokemon payload: bounds[number] -> loaded
export const loadPokemonsByBounds = createAction(
  '[Pokemons] Load Pokemons By Bounds',
  props<{ bounds: number[] }>()
);

export const loadPokemonsByBoundsSuccess = createAction(
  '[Pokemons] Load Pokemons By Bounds Success',
  props<{ pokemons: Pokemon[] }>()
);

export const loadPokemonsByBoundsFailure = createAction(
  '[Pokemons] Load Pokemons By Bounds Failure',
  props<{ error: any }>()
);

// Load Many Pokemon payload: names[string] -> loaded
export const loadManyPokemons = createAction(
  '[Pokemons] Load Many Pokemons',
  props<{ pokemonNames: string[] }>()
);


// Load Pokemon
export const loadPokemon = createAction(
  '[Pokemons] Load Pokemon',
  props<{ pokemonId: string }>()
);

export const loadPokemonSuccess = createAction(
  '[Pokemons] Load Pokemon Success',
  props<{ pokemon: Pokemon }>()
);

export const loadPokemonFailure = createAction(
  '[Pokemons] Load Pokemon Failure',
  props<{ error: any }>()
);

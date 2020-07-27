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

// Create Pokemon
export const createPokemon = createAction(
  '[Pokemons] Create Pokemon',
  props<{ pokemon: Pokemon }>()
);

export const createPokemonSuccess = createAction(
  '[Pokemons] Create Pokemon Success',
  props<{ pokemon: Pokemon }>()
);

export const createPokemonFailure = createAction(
  '[Pokemons] Create Pokemon Failure',
  props<{ error: any }>()
);

// Update Pokemon
export const updatePokemon = createAction(
  '[Pokemons] Update Pokemon',
  props<{ pokemon: Pokemon }>()
);

export const updatePokemonSuccess = createAction(
  '[Pokemons] Update Pokemon Success',
  props<{ pokemon: Pokemon }>()
);

export const updatePokemonFailure = createAction(
  '[Pokemons] Update Pokemon Failure',
  props<{ error: any }>()
);

// Delete Pokemon
export const deletePokemon = createAction(
  '[Pokemons] Delete Pokemon',
  props<{ pokemon: Pokemon }>()
);

export const deletePokemonCancelled = createAction(
  '[Pokemons] Delete Pokemon Cancelled'
);

export const deletePokemonSuccess = createAction(
  '[Pokemons] Delete Pokemon Success',
  props<{ pokemon: Pokemon }>()
);

export const deletePokemonFailure = createAction(
  '[Pokemons] Delete Pokemon Failure',
  props<{ error: any }>()
);
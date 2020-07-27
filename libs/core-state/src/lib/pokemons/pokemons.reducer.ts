import { Pokemon } from '@thirty/api-interfaces';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import * as PokemonsActions from './pokemons.actions';

export const POKEMONS_FEATURE_KEY = 'pokemon';

export interface PokemonsState extends EntityState<Pokemon> {
  selectedId?: string | number; // which Pokemons record has been selected
  loaded: boolean; // has the Pokemons list been loaded
  error?: string | null; // last known error (if any)
}

export interface PokemonsPartialState {
  readonly [POKEMONS_FEATURE_KEY]: PokemonsState;
}

export const pokemonAdapter: EntityAdapter<Pokemon> = createEntityAdapter();

export const initialPokemonsState: PokemonsState = pokemonAdapter.getInitialState({
  // set initial required properties
  loaded: false
});

const _pokemonsReducer = createReducer(
  initialPokemonsState,
  on(PokemonsActions.resetPokemons, state => pokemonAdapter.removeAll(state)),
  on(PokemonsActions.resetSelectedPokemon, state => Object.assign({}, state, { selectedId: null })),
  on(PokemonsActions.selectPokemon, (state, { selectedId }) =>
    Object.assign({}, state, { selectedId })
  ),
  // Load pokemons
  on(
    PokemonsActions.loadPokemonsSuccess,
    (state, { pokemons }) =>
    pokemonAdapter.setAll(pokemons, { ...state, loaded: true })
  ),
  // Load pokemon
  on(
    PokemonsActions.loadPokemonSuccess,
    (state, { pokemon }) =>
    pokemonAdapter.upsertOne(pokemon, { ...state, loaded: true })
  ),
  // Add pokemon
  on(PokemonsActions.createPokemonSuccess,
    (state, { pokemon }) =>
    pokemonAdapter.addOne(pokemon, state)
  ),
  // Update pokemon
  on(PokemonsActions.updatePokemonSuccess,
    (state, { pokemon }) =>
    pokemonAdapter.updateOne({ id: pokemon.id, changes: pokemon }, state)
  ),
  // Delete pokemon
  on(PokemonsActions.deletePokemonSuccess,
    (state, { pokemon }) =>
    pokemonAdapter.removeOne(pokemon.id, state)
  ),

  // failure actions
  on(
    PokemonsActions.deletePokemonFailure,
    PokemonsActions.updatePokemonFailure,
    PokemonsActions.createPokemonFailure,
    PokemonsActions.loadPokemonFailure,
    PokemonsActions.loadPokemonsFailure,
    (state, { error }) => ({
      ...state,
      error
    })
  ),

  // load actions
  on(
    PokemonsActions.loadPokemon,
    PokemonsActions.loadPokemons,
    (state) => ({
      ...state,
      loaded: false,
      error: null
    })
  )
);

export function pokemonsReducer(state: PokemonsState | undefined, action: Action) {
  return _pokemonsReducer(state, action);
}
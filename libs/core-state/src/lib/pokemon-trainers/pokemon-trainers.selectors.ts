import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  POKEMONTRAINERS_FEATURE_KEY,
  PokemonTrainersState,
  PokemonTrainersPartialState,
  pokemonTrainerAdapter
} from './pokemon-trainers.reducer';
import * as PokemonsSelectors from '../pokemons/pokemons.selectors';
import { PokemonsFacade } from '../pokemons/pokemons.facade'
import { PokemonTrainer, Pokemon } from '@thirty/api-interfaces';

// Lookup the 'PokemonTrainers' feature state managed by NgRx
export const getPokemonTrainersState = createFeatureSelector<
  PokemonTrainersPartialState,
  PokemonTrainersState
>(POKEMONTRAINERS_FEATURE_KEY);

const { selectAll, selectEntities } = pokemonTrainerAdapter.getSelectors();

export const getPokemonTrainersLoaded = createSelector(
  getPokemonTrainersState,
  (state: PokemonTrainersState) => state.loaded
);

export const getPokemonTrainersError = createSelector(
  getPokemonTrainersState,
  (state: PokemonTrainersState) => state.error
);

export const getAllPokemonTrainers = createSelector(
  getPokemonTrainersState,
  (state: PokemonTrainersState) => selectAll(state)
);

export const getPokemonTrainersEntities = createSelector(
  getPokemonTrainersState,
  (state: PokemonTrainersState) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getPokemonTrainersState,
  (state: PokemonTrainersState) => state.selectedId
);

export const getSelectedPokemonTrainer = createSelector(
  getPokemonTrainersEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);

export const getTrainerPokemons = createSelector(
  getSelectedPokemonTrainer,
  PokemonsSelectors.getAllPokemons,
  (pokemonTrainer: PokemonTrainer, pokemons: Pokemon[]) => {

    const pokemonList = pokemons.filter((pokemon: Pokemon) => 
      pokemonTrainer?.pokemons.includes(pokemon.name)
    )

    const newPokemons = [];
    pokemonTrainer?.pokemons.map((name) => {
      pokemonList.forEach((pokemon)=> {
        if(pokemon.name === name){
          newPokemons.push(pokemon);
        }
      })
    })

    return newPokemons
  }
);
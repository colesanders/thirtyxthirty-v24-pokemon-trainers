import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  POKEMONTRAINERS_FEATURE_KEY,
  PokemonTrainersState,
  PokemonTrainersPartialState,
  pokemonTrainerAdapter
} from './pokemon-trainers.reducer';

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
import { PokemonTrainer } from '@thirty/api-interfaces';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import * as PokemonTrainersActions from './pokemon-trainers.actions';

export const POKEMONTRAINERS_FEATURE_KEY = 'pokemonTrainer';

export interface PokemonTrainersState extends EntityState<PokemonTrainer> {
  selectedId?: string | number; // which PokemonTrainers record has been selected
  loaded: boolean; // has the PokemonTrainers list been loaded
  error?: string | null; // last known error (if any)
}

export interface PokemonTrainersPartialState {
  readonly [POKEMONTRAINERS_FEATURE_KEY]: PokemonTrainersState;
}

export const pokemonTrainerAdapter: EntityAdapter<PokemonTrainer> = createEntityAdapter();

export const initialPokemonTrainersState: PokemonTrainersState = pokemonTrainerAdapter.getInitialState({
  // set initial required properties
  loaded: false
});

const _pokemonTrainersReducer = createReducer(
  initialPokemonTrainersState,
  on(PokemonTrainersActions.resetPokemonTrainers, state => pokemonTrainerAdapter.removeAll(state)),
  on(PokemonTrainersActions.resetSelectedPokemonTrainer, state => Object.assign({}, state, { selectedId: null })),
  on(PokemonTrainersActions.selectPokemonTrainer, (state, { selectedId }) =>
    Object.assign({}, state, { selectedId })
  ),
  // Load pokemontrainers
  on(
    PokemonTrainersActions.loadPokemonTrainersSuccess,
    (state, { pokemonTrainers }) =>
    pokemonTrainerAdapter.setAll(pokemonTrainers, { ...state, loaded: true })
  ),
  // Load pokemontrainer
  on(
    PokemonTrainersActions.loadPokemonTrainerSuccess,
    (state, { pokemonTrainer }) =>
    pokemonTrainerAdapter.upsertOne(pokemonTrainer, { ...state, loaded: true })
  ),
  // Add pokemontrainer
  on(PokemonTrainersActions.createPokemonTrainerSuccess,
    (state, { pokemonTrainer }) =>
    pokemonTrainerAdapter.addOne(pokemonTrainer, state)
  ),
  // Update pokemontrainer
  on(PokemonTrainersActions.updatePokemonTrainerSuccess,
    (state, { pokemonTrainer }) =>
    pokemonTrainerAdapter.updateOne({ id: pokemonTrainer.id, changes: pokemonTrainer }, state)
  ),
  // Delete pokemontrainer
  on(PokemonTrainersActions.deletePokemonTrainerSuccess,
    (state, { pokemonTrainer }) =>
    pokemonTrainerAdapter.removeOne(pokemonTrainer.id, state)
  ),

  // failure actions
  on(
    PokemonTrainersActions.deletePokemonTrainerFailure,
    PokemonTrainersActions.updatePokemonTrainerFailure,
    PokemonTrainersActions.createPokemonTrainerFailure,
    PokemonTrainersActions.loadPokemonTrainerFailure,
    PokemonTrainersActions.loadPokemonTrainersFailure,
    (state, { error }) => ({
      ...state,
      error
    })
  ),

  // load actions
  on(
    PokemonTrainersActions.loadPokemonTrainer,
    PokemonTrainersActions.loadPokemonTrainers,
    (state) => ({
      ...state,
      loaded: false,
      error: null
    })
  )
);

export function pokemonTrainersReducer(state: PokemonTrainersState | undefined, action: Action) {
  return _pokemonTrainersReducer(state, action);
}
import { PokemonTrainer } from '@thirty/api-interfaces';
import { createAction, props } from '@ngrx/store';

export const resetSelectedPokemonTrainer = createAction('[PokemonTrainers] Reset Selected PokemonTrainer');
export const resetPokemonTrainers = createAction('[PokemonTrainers] Reset PokemonTrainers');

// Select PokemonTrainer
export const selectPokemonTrainer = createAction(
  '[PokemonTrainers] Select PokemonTrainer',
  props<{ selectedId: string }>()
);

// Load PokemonTrainers
export const loadPokemonTrainers = createAction('[PokemonTrainers] Load PokemonTrainers');

export const loadPokemonTrainersSuccess = createAction(
  '[PokemonTrainers] Load PokemonTrainers Success',
  props<{ pokemonTrainers: PokemonTrainer[] }>()
);

export const loadPokemonTrainersFailure = createAction(
  '[PokemonTrainers] Load PokemonTrainers Failure',
  props<{ error: any }>()
);

// Load PokemonTrainer
export const loadPokemonTrainer = createAction(
  '[PokemonTrainers] Load PokemonTrainer',
  props<{ pokemonTrainerId: string }>()
);

export const loadPokemonTrainerSuccess = createAction(
  '[PokemonTrainers] Load PokemonTrainer Success',
  props<{ pokemonTrainer: PokemonTrainer }>()
);

export const loadPokemonTrainerFailure = createAction(
  '[PokemonTrainers] Load PokemonTrainer Failure',
  props<{ error: any }>()
);

// Create PokemonTrainer
export const createPokemonTrainer = createAction(
  '[PokemonTrainers] Create PokemonTrainer',
  props<{ pokemonTrainer: PokemonTrainer }>()
);

export const createPokemonTrainerSuccess = createAction(
  '[PokemonTrainers] Create PokemonTrainer Success',
  props<{ pokemonTrainer: PokemonTrainer }>()
);

export const createPokemonTrainerFailure = createAction(
  '[PokemonTrainers] Create PokemonTrainer Failure',
  props<{ error: any }>()
);

// Update PokemonTrainer
export const updatePokemonTrainer = createAction(
  '[PokemonTrainers] Update PokemonTrainer',
  props<{ pokemonTrainer: PokemonTrainer }>()
);

export const updatePokemonTrainerSuccess = createAction(
  '[PokemonTrainers] Update PokemonTrainer Success',
  props<{ pokemonTrainer: PokemonTrainer }>()
);

export const updatePokemonTrainerFailure = createAction(
  '[PokemonTrainers] Update PokemonTrainer Failure',
  props<{ error: any }>()
);

// Delete PokemonTrainer
export const deletePokemonTrainer = createAction(
  '[PokemonTrainers] Delete PokemonTrainer',
  props<{ pokemonTrainer: PokemonTrainer }>()
);

export const deletePokemonTrainerCancelled = createAction(
  '[PokemonTrainers] Delete PokemonTrainer Cancelled'
);

export const deletePokemonTrainerSuccess = createAction(
  '[PokemonTrainers] Delete PokemonTrainer Success',
  props<{ pokemonTrainer: PokemonTrainer }>()
);

export const deletePokemonTrainerFailure = createAction(
  '[PokemonTrainers] Delete PokemonTrainer Failure',
  props<{ error: any }>()
);
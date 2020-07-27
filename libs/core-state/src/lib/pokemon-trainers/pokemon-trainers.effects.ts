import { Injectable } from '@angular/core';
import { PokemonTrainersService } from '@thirty/core-data';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { fetch, pessimisticUpdate } from '@nrwl/angular';
import { map, tap } from 'rxjs/operators';
import * as PokemonTrainersActions from './pokemon-trainers.actions';
import { PokemonTrainer } from '@thirty/api-interfaces';

@Injectable()
export class PokemonTrainersEffects {
  @Effect() loadPokemonTrainers$ = this.actions$.pipe(
    ofType(PokemonTrainersActions.loadPokemonTrainers),
    fetch({
      run: (action) => this.pokemonTrainersService.all().pipe(
        map((pokemonTrainers: PokemonTrainer[]) => PokemonTrainersActions.loadPokemonTrainersSuccess({ pokemonTrainers }))
      ),
      onError: (action, error) => PokemonTrainersActions.loadPokemonTrainersFailure({ error })
    })
  );

  @Effect() loadPokemonTrainer$ = this.actions$.pipe(
    ofType(PokemonTrainersActions.loadPokemonTrainer),
    fetch({
      run: (action) => this.pokemonTrainersService.byId(action.pokemonTrainerId).pipe(
        map((pokemonTrainer: PokemonTrainer) => PokemonTrainersActions.loadPokemonTrainerSuccess({ pokemonTrainer }))
      ),
      onError: (action, error) => PokemonTrainersActions.loadPokemonTrainerFailure({ error })
    })
  );

  @Effect() createPokemonTrainer$ = this.actions$.pipe(
    ofType(PokemonTrainersActions.createPokemonTrainer),
    pessimisticUpdate({
      run: (action) => this.pokemonTrainersService.create(action.pokemonTrainer).pipe(
        map((pokemonTrainer: PokemonTrainer) => PokemonTrainersActions.createPokemonTrainerSuccess({ pokemonTrainer }))
      ),
      onError: (action, error) => PokemonTrainersActions.createPokemonTrainerFailure({ error })
    })
  );

  @Effect() updatePokemonTrainer$ = this.actions$.pipe(
    ofType(PokemonTrainersActions.updatePokemonTrainer),
    pessimisticUpdate({
      run: (action) => this.pokemonTrainersService.update(action.pokemonTrainer).pipe(
        map((pokemonTrainer: PokemonTrainer) => 
          PokemonTrainersActions.updatePokemonTrainerSuccess({ pokemonTrainer }))
      ),
      onError: (action, error) => PokemonTrainersActions.updatePokemonTrainerFailure({ error })
    })
  );

  @Effect() deletePokemonTrainer$ = this.actions$.pipe(
    ofType(PokemonTrainersActions.deletePokemonTrainer),
    pessimisticUpdate({
      run: (action) => this.pokemonTrainersService.delete(action.pokemonTrainer.id).pipe(
        map((pokemonTrainer: PokemonTrainer) => PokemonTrainersActions.deletePokemonTrainerSuccess({ pokemonTrainer })),
      ),
      onError: (action, error) => PokemonTrainersActions.deletePokemonTrainerFailure({ error })
    })
  );

  // Effect to refresh the pokemontrainer after an async operation changes the database
  // Made in order to reduce risk of timing errors between async and sync operations
  // @Effect() refreshOnSucces = this.actions$.pipe(
  //   ofType(PokemonTrainersActions.deletePokemonTrainerSuccess, PokemonTrainersActions.updatePokemonTrainerSuccess),
  //   tap(action => {
  //     PokemonTrainersActions.loadPokemonTrainers();
  //   })
  // );

  constructor(
    private actions$: Actions,
    private pokemonTrainersService: PokemonTrainersService
  ) {}
}
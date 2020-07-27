import { Injectable } from '@angular/core';
import { filter } from 'rxjs/operators';
import { select, Store, Action, ActionsSubject } from '@ngrx/store';

import { PokemonTrainer } from '@thirty/api-interfaces';

import * as PokemonTrainersActions from './pokemon-trainers.actions';
import * as fromPokemonTrainers from './pokemon-trainers.reducer';
import * as PokemonTrainersSelectors from './pokemon-trainers.selectors';

@Injectable({
  providedIn: 'root'
})
export class PokemonTrainersFacade {
  loaded$ = this.store.pipe(select(PokemonTrainersSelectors.getPokemonTrainersLoaded));
  allPokemonTrainers$ = this.store.pipe(select(PokemonTrainersSelectors.getAllPokemonTrainers));
  selectedPokemonTrainer$ = this.store.pipe(select(PokemonTrainersSelectors.getSelectedPokemonTrainer));

  mutations$ = this.actions$.pipe(
    filter((action: Action) =>
    action.type === PokemonTrainersActions.createPokemonTrainer({} as any).type ||
    action.type === PokemonTrainersActions.updatePokemonTrainer({} as any).type ||
    action.type === PokemonTrainersActions.deletePokemonTrainer({} as any).type
    )
  );

  constructor(private store: Store, private actions$: ActionsSubject) { }

  selectPokemonTrainer(selectedId: string) {
    this.dispatch(PokemonTrainersActions.selectPokemonTrainer({ selectedId }));
  }

  resetSelectedPokemonTrainer(){
    this.dispatch(PokemonTrainersActions.resetSelectedPokemonTrainer());
  }

  loadPokemonTrainers() {
    this.dispatch(PokemonTrainersActions.loadPokemonTrainers());
  }

  loadPokemonTrainer(pokemonTrainerId: string) {
    this.dispatch(PokemonTrainersActions.loadPokemonTrainer({ pokemonTrainerId }));
  }

  createPokemonTrainer(pokemonTrainer: PokemonTrainer) {
    this.dispatch(PokemonTrainersActions.createPokemonTrainer({ pokemonTrainer }));
  }

  updatePokemonTrainer(pokemonTrainer: PokemonTrainer) {
    this.dispatch(PokemonTrainersActions.updatePokemonTrainer({ pokemonTrainer }));
  }

  deletePokemonTrainer(pokemonTrainer: PokemonTrainer) {
    this.dispatch(PokemonTrainersActions.deletePokemonTrainer({ pokemonTrainer }));
  }

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}

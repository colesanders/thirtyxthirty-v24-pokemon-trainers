import { Injectable } from '@angular/core';
import { filter } from 'rxjs/operators';
import { select, Store, Action, ActionsSubject } from '@ngrx/store';

import { Pokemon } from '@thirty/api-interfaces';

import * as PokemonsActions from './pokemons.actions';
import * as fromPokemons from './pokemons.reducer';
import * as PokemonsSelectors from './pokemons.selectors';

@Injectable({
  providedIn: 'root'
})
export class PokemonsFacade {
  loaded$ = this.store.pipe(select(PokemonsSelectors.getPokemonsLoaded));
  allPokemons$ = this.store.pipe(select(PokemonsSelectors.getAllPokemons));
  selectedPokemon$ = this.store.pipe(select(PokemonsSelectors.getSelectedPokemon));

  mutations$ = this.actions$.pipe(
    filter((action: Action) =>
    action.type === PokemonsActions.createPokemon({} as any).type ||
    action.type === PokemonsActions.updatePokemon({} as any).type ||
    action.type === PokemonsActions.deletePokemon({} as any).type
    )
  );

  constructor(private store: Store, private actions$: ActionsSubject) { }

  selectPokemon(selectedId: string) {
    this.dispatch(PokemonsActions.selectPokemon({ selectedId }));
  }

  resetSelectedPokemon(){
    this.dispatch(PokemonsActions.resetSelectedPokemon());
  }

  loadPokemons() {
    this.dispatch(PokemonsActions.loadPokemons());
  }

  loadPokemon(pokemonId: string) {
    this.dispatch(PokemonsActions.loadPokemon({ pokemonId }));
  }

  createPokemon(pokemon: Pokemon) {
    this.dispatch(PokemonsActions.createPokemon({ pokemon }));
  }

  updatePokemon(pokemon: Pokemon) {
    this.dispatch(PokemonsActions.updatePokemon({ pokemon }));
  }

  deletePokemon(pokemon: Pokemon) {
    this.dispatch(PokemonsActions.deletePokemon({ pokemon }));
  }

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}

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

  constructor(private store: Store, private actions$: ActionsSubject) { }

  loadManyPokemon(pokemonNames: string[]){
    this.dispatch(PokemonsActions.loadManyPokemons({ pokemonNames }))
  }

  selectPokemon(selectedId: string) {
    this.dispatch(PokemonsActions.selectPokemon({ selectedId }));
  }

  resetSelectedPokemon(){
    this.dispatch(PokemonsActions.resetSelectedPokemon());
  }

  loadMax() {
    const bounds: number[] = [0,964]

    this.dispatch(PokemonsActions.loadPokemonsByBounds({ bounds }));
  }

  loadPokemons() {
    this.dispatch(PokemonsActions.loadPokemons());
  }

  loadPokemonsByBounds(bounds: number[]) {
    this.dispatch(PokemonsActions.loadPokemonsByBounds({ bounds }));
  }

  loadPokemon(pokemonId: string) {
    this.dispatch(PokemonsActions.loadPokemon({ pokemonId }));
  }

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}

import { Injectable } from '@angular/core';
import { PokemonsService } from '@thirty/core-data';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { fetch, pessimisticUpdate } from '@nrwl/angular';
import { map, tap, exhaust, exhaustMap, catchError } from 'rxjs/operators';
import * as PokemonsActions from './pokemons.actions';
import { Pokemon, PokemonApiObj } from '@thirty/api-interfaces';
import { merge, of } from 'rxjs';

@Injectable()
export class PokemonsEffects {
  @Effect() loadPokemons$ = this.actions$.pipe(
    ofType(PokemonsActions.loadPokemons),
    fetch({
      run: (action) => this.pokemonsService.all().pipe(
        map((pokemonApiObj: PokemonApiObj) => {
          const pokemons: Pokemon[] = pokemonApiObj.results;
          for(let i = 0; i < pokemons.length;i++){
            pokemons[i] = {...pokemons[i], id: i+''}
          }
          return PokemonsActions.loadPokemonsSuccess({ pokemons })
        })
      ),
      onError: (action, error) => PokemonsActions.loadPokemonsFailure({ error })
    })
  );

  @Effect() loadPokemonsByBounds$ = this.actions$.pipe(
    ofType(PokemonsActions.loadPokemonsByBounds),
    fetch({
      run: (action) => this.pokemonsService.byBounds(action.bounds).pipe(
        map((pokemonApiObj: PokemonApiObj) => {
          const pokemons: Pokemon[] = pokemonApiObj.results;
          return PokemonsActions.loadPokemonsByBoundsSuccess({ pokemons })
        })
      ),
      onError: (action, error) => PokemonsActions.loadPokemonsByBoundsFailure({ error })
    })
  );

  @Effect() loadManyPokemons$ = this.actions$.pipe(
    ofType(PokemonsActions.loadManyPokemons),
    exhaustMap((action) => 
      merge(
        ...action.pokemonNames.map(name => 
          this.pokemonsService.byName(name).pipe(
            map(pokemon => PokemonsActions.loadPokemonSuccess({ pokemon })),
            catchError(err =>
              of(PokemonsActions.loadPokemonFailure(err.message)),
            ),
          ),
        ),
      )
    )
  );

  @Effect() loadPokemon$ = this.actions$.pipe(
    ofType(PokemonsActions.loadPokemon),
    fetch({
      run: (action) => this.pokemonsService.byName(action.pokemonId).pipe(
        map((pokemon: Pokemon) => PokemonsActions.loadPokemonSuccess({ pokemon }))
      ),
      onError: (action, error) => PokemonsActions.loadPokemonFailure({ error })
    })
  );

  // Effect to refresh the pokemon after an async operation changes the database
  // Made in order to reduce risk of timing errors between async and sync operations
  // @Effect() refreshOnSucces = this.actions$.pipe(
  //   ofType(PokemonsActions.deletePokemonSuccess, PokemonsActions.updatePokemonSuccess),
  //   tap(action => {
  //     PokemonsActions.loadPokemons();
  //   })
  // );

  constructor(
    private actions$: Actions,
    private pokemonsService: PokemonsService
  ) {}
}
import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { PokemonsEntity } from './pokemons.models';
import { PokemonsEffects } from './pokemons.effects';
import { PokemonsFacade } from './pokemons.facade';

import * as PokemonsSelectors from './pokemons.selectors';
import * as PokemonsActions from './pokemons.actions';
import {
  POKEMONS_FEATURE_KEY,
  State,
  initialState,
  reducer,
} from './pokemons.reducer';

interface TestSchema {
  pokemons: State;
}

describe('PokemonsFacade', () => {
  let facade: PokemonsFacade;
  let store: Store<TestSchema>;
  const createPokemonsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as PokemonsEntity);

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(POKEMONS_FEATURE_KEY, reducer),
          EffectsModule.forFeature([PokemonsEffects]),
        ],
        providers: [PokemonsFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.get(Store);
      facade = TestBed.get(PokemonsFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async (done) => {
      try {
        let list = await readFirst(facade.allPokemons$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(PokemonsActions.loadPokemons());

        list = await readFirst(facade.allPokemons$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `loadPokemonsSuccess` to manually update list
     */
    it('allPokemons$ should return the loaded list; and loaded flag == true', async (done) => {
      try {
        let list = await readFirst(facade.allPokemons$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(
          PokemonsActions.loadPokemonsSuccess({
            pokemons: [
              createPokemonsEntity('AAA'),
              createPokemonsEntity('BBB'),
            ],
          })
        );

        list = await readFirst(facade.allPokemons$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(2);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });
});

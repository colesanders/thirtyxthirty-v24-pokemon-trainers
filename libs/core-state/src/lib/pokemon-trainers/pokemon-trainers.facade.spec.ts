import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { PokemonTrainersEntity } from './pokemon-trainers.models';
import { PokemonTrainersEffects } from './pokemon-trainers.effects';
import { PokemonTrainersFacade } from './pokemon-trainers.facade';

import * as PokemonTrainersSelectors from './pokemon-trainers.selectors';
import * as PokemonTrainersActions from './pokemon-trainers.actions';
import {
  POKEMONTRAINERS_FEATURE_KEY,
  State,
  initialState,
  reducer,
} from './pokemon-trainers.reducer';

interface TestSchema {
  pokemonTrainers: State;
}

describe('PokemonTrainersFacade', () => {
  let facade: PokemonTrainersFacade;
  let store: Store<TestSchema>;
  const createPokemonTrainersEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as PokemonTrainersEntity);

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(POKEMONTRAINERS_FEATURE_KEY, reducer),
          EffectsModule.forFeature([PokemonTrainersEffects]),
        ],
        providers: [PokemonTrainersFacade],
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
      facade = TestBed.get(PokemonTrainersFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async (done) => {
      try {
        let list = await readFirst(facade.allPokemonTrainers$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(PokemonTrainersActions.loadPokemonTrainers());

        list = await readFirst(facade.allPokemonTrainers$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `loadPokemonTrainersSuccess` to manually update list
     */
    it('allPokemonTrainers$ should return the loaded list; and loaded flag == true', async (done) => {
      try {
        let list = await readFirst(facade.allPokemonTrainers$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(
          PokemonTrainersActions.loadPokemonTrainersSuccess({
            pokemonTrainers: [
              createPokemonTrainersEntity('AAA'),
              createPokemonTrainersEntity('BBB'),
            ],
          })
        );

        list = await readFirst(facade.allPokemonTrainers$);
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

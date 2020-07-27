import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { PokemonTrainersEffects } from './pokemon-trainers.effects';
import * as PokemonTrainersActions from './pokemon-trainers.actions';

describe('PokemonTrainersEffects', () => {
  let actions: Observable<any>;
  let effects: PokemonTrainersEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        PokemonTrainersEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.get(PokemonTrainersEffects);
  });

  describe('loadPokemonTrainers$', () => {
    it('should work', () => {
      actions = hot('-a-|', {
        a: PokemonTrainersActions.loadPokemonTrainers(),
      });

      const expected = hot('-a-|', {
        a: PokemonTrainersActions.loadPokemonTrainersSuccess({
          pokemonTrainers: [],
        }),
      });

      expect(effects.loadPokemonTrainers$).toBeObservable(expected);
    });
  });
});

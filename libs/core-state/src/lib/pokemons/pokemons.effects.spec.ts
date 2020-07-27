import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { PokemonsEffects } from './pokemons.effects';
import * as PokemonsActions from './pokemons.actions';

describe('PokemonsEffects', () => {
  let actions: Observable<any>;
  let effects: PokemonsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        PokemonsEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.get(PokemonsEffects);
  });

  describe('loadPokemons$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: PokemonsActions.loadPokemons() });

      const expected = hot('-a-|', {
        a: PokemonsActions.loadPokemonsSuccess({ pokemons: [] }),
      });

      expect(effects.loadPokemons$).toBeObservable(expected);
    });
  });
});

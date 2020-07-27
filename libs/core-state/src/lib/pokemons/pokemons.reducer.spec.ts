import { PokemonsEntity } from './pokemons.models';
import * as PokemonsActions from './pokemons.actions';
import { State, initialState, reducer } from './pokemons.reducer';

describe('Pokemons Reducer', () => {
  const createPokemonsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as PokemonsEntity);

  beforeEach(() => {});

  describe('valid Pokemons actions', () => {
    it('loadPokemonsSuccess should return set the list of known Pokemons', () => {
      const pokemons = [
        createPokemonsEntity('PRODUCT-AAA'),
        createPokemonsEntity('PRODUCT-zzz'),
      ];
      const action = PokemonsActions.loadPokemonsSuccess({ pokemons });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});

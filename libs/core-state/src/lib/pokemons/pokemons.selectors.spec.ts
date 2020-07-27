import { PokemonsEntity } from './pokemons.models';
import { State, pokemonsAdapter, initialState } from './pokemons.reducer';
import * as PokemonsSelectors from './pokemons.selectors';

describe('Pokemons Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getPokemonsId = (it) => it['id'];
  const createPokemonsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as PokemonsEntity);

  let state;

  beforeEach(() => {
    state = {
      pokemons: pokemonsAdapter.addAll(
        [
          createPokemonsEntity('PRODUCT-AAA'),
          createPokemonsEntity('PRODUCT-BBB'),
          createPokemonsEntity('PRODUCT-CCC'),
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Pokemons Selectors', () => {
    it('getAllPokemons() should return the list of Pokemons', () => {
      const results = PokemonsSelectors.getAllPokemons(state);
      const selId = getPokemonsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = PokemonsSelectors.getSelected(state);
      const selId = getPokemonsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getPokemonsLoaded() should return the current 'loaded' status", () => {
      const result = PokemonsSelectors.getPokemonsLoaded(state);

      expect(result).toBe(true);
    });

    it("getPokemonsError() should return the current 'error' state", () => {
      const result = PokemonsSelectors.getPokemonsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});

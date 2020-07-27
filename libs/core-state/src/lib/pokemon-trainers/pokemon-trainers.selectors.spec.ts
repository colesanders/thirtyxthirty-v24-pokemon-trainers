import { PokemonTrainersEntity } from './pokemon-trainers.models';
import {
  State,
  pokemonTrainersAdapter,
  initialState,
} from './pokemon-trainers.reducer';
import * as PokemonTrainersSelectors from './pokemon-trainers.selectors';

describe('PokemonTrainers Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getPokemonTrainersId = (it) => it['id'];
  const createPokemonTrainersEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as PokemonTrainersEntity);

  let state;

  beforeEach(() => {
    state = {
      pokemonTrainers: pokemonTrainersAdapter.addAll(
        [
          createPokemonTrainersEntity('PRODUCT-AAA'),
          createPokemonTrainersEntity('PRODUCT-BBB'),
          createPokemonTrainersEntity('PRODUCT-CCC'),
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

  describe('PokemonTrainers Selectors', () => {
    it('getAllPokemonTrainers() should return the list of PokemonTrainers', () => {
      const results = PokemonTrainersSelectors.getAllPokemonTrainers(state);
      const selId = getPokemonTrainersId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = PokemonTrainersSelectors.getSelected(state);
      const selId = getPokemonTrainersId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getPokemonTrainersLoaded() should return the current 'loaded' status", () => {
      const result = PokemonTrainersSelectors.getPokemonTrainersLoaded(state);

      expect(result).toBe(true);
    });

    it("getPokemonTrainersError() should return the current 'error' state", () => {
      const result = PokemonTrainersSelectors.getPokemonTrainersError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});

import { PokemonTrainersEntity } from './pokemon-trainers.models';
import * as PokemonTrainersActions from './pokemon-trainers.actions';
import { State, initialState, reducer } from './pokemon-trainers.reducer';

describe('PokemonTrainers Reducer', () => {
  const createPokemonTrainersEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as PokemonTrainersEntity);

  beforeEach(() => {});

  describe('valid PokemonTrainers actions', () => {
    it('loadPokemonTrainersSuccess should return set the list of known PokemonTrainers', () => {
      const pokemonTrainers = [
        createPokemonTrainersEntity('PRODUCT-AAA'),
        createPokemonTrainersEntity('PRODUCT-zzz'),
      ];
      const action = PokemonTrainersActions.loadPokemonTrainersSuccess({
        pokemonTrainers,
      });

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

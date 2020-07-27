import { TestBed } from '@angular/core/testing';

import { PokemonTrainersService } from './pokemon-trainers.service';

describe('PokemonTrainersService', () => {
  let service: PokemonTrainersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokemonTrainersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

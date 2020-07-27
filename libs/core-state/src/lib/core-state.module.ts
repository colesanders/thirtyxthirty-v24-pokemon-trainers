import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromPokemonTrainers from './pokemon-trainers/pokemon-trainers.reducer';
import { PokemonTrainersEffects } from './pokemon-trainers/pokemon-trainers.effects';
import { PokemonTrainersFacade } from './pokemon-trainers/pokemon-trainers.facade';
import * as fromPokemons from './pokemons/pokemons.reducer';
import { PokemonsEffects } from './pokemons/pokemons.effects';
import { PokemonsFacade } from './pokemons/pokemons.facade';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromPokemonTrainers.POKEMONTRAINERS_FEATURE_KEY,
      fromPokemonTrainers.pokemonTrainersReducer
    ),
    EffectsModule.forFeature([PokemonTrainersEffects]),
    StoreModule.forFeature(
      fromPokemons.POKEMONS_FEATURE_KEY,
      fromPokemons.pokemonsReducer
    ),
    EffectsModule.forFeature([PokemonsEffects]),
  ],
  providers: [PokemonTrainersFacade, PokemonsFacade],
})
export class CoreStateModule {}

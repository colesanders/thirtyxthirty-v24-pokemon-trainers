import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CoreStateModule } from '@thirty/core-state';
import { CoreDataModule } from '@thirty/core-data';
import { MaterialModule, RatingComponent, MatChipComponent } from '@thirty/material';
import * as fromPokemons from '@thirty/core-state';

import { RoutingModule } from './routing.module';
import { AppComponent } from './app.component';

import { PokemonsComponent } from './pokemons/pokemons.component';
import { PokemonsDetailComponent } from './pokemons/components/pokemons-detail/pokemons-detail.component';
import { PokemonsListComponent } from './pokemons/components/pokemons-list/pokemons-list.component';

import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';

import { PokemonTrainersComponent } from './pokemon-trainers/pokemon-trainers.component';
import { PokemonTrainersOverviewComponent } from './pokemon-trainers/components/pokemon-trainers-overview/pokemon-trainers-overview.component';
import { PokemonTrainersDetailComponent } from './pokemon-trainers/components/pokemon-trainers-detail/pokemon-trainers-detail.component';
import { PokemonTrainersListComponent } from './pokemon-trainers/components/pokemon-trainers-list/pokemon-trainers-list.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PokemonTrainersSelectComponent } from './pokemon-trainers/components/pokemon-trainers-select/pokemon-trainers-select.component';
import { StatsOverviewComponent } from './pokemons/components/stats-overview/stats-overview.component';



@NgModule({
  declarations: [
    AppComponent,
    PokemonTrainersComponent,
    PokemonTrainersDetailComponent,
    PokemonTrainersListComponent,
    PokemonsComponent,
    PokemonTrainersOverviewComponent,
    PokemonsDetailComponent,
    PokemonsListComponent,
    FourOhFourComponent,
    PokemonsComponent,
    RatingComponent,
    MatChipComponent,
    PokemonTrainersSelectComponent,
    StatsOverviewComponent,
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    HttpClientModule,
    CoreStateModule,
    CoreDataModule,
    FormsModule,
    RoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(fromPokemons.pokemonsReducer, {}),
    StoreModule.forRoot(fromPokemons.pokemonTrainersReducer, {}),
    EffectsModule.forRoot([fromPokemons.PokemonsEffects]),
    EffectsModule.forRoot([fromPokemons.PokemonTrainersEffects]),
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}



import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { PokemonsComponent } from './pokemons/pokemons.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { UiLoginModule } from '@thirty/ui-login';
import { LoginComponent } from '@thirty/ui-login';
import { PokemonTrainersOverviewComponent } from './pokemon-trainers/components/pokemon-trainers-overview/pokemon-trainers-overview.component';

import { LoginGuard } from '@thirty/ui-login';
import { PokemonTrainersComponent } from './pokemon-trainers/pokemon-trainers.component';
import { StatsOverviewComponent } from './pokemons/components/stats-overview/stats-overview.component';

const routes: Routes = [
  { path: 'pokemon-trainers', component: PokemonTrainersComponent,
    canActivate: [LoginGuard],
    children: [
      {
        path: ':id', // child route path
        component: PokemonTrainersOverviewComponent // child route component that the router renders
      }
    ]
  },
  { path: 'pokemons', component: PokemonsComponent,
    canActivate: [LoginGuard],
    children: [
      {
        path: ':name', // child route path
        component: StatsOverviewComponent // child route component that the router renders
      }
    ]
  },
  { path: 'login', component: LoginComponent},
  { path: '404', component: FourOhFourComponent},
  { path: '', redirectTo: '/pokemons', pathMatch: 'full'},
  { path: '**', component: FourOhFourComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UiLoginModule,
      RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class RoutingModule { }

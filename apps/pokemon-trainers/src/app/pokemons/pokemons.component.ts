import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { PokemonsFacade } from '@thirty/core-state'
import { Pokemon } from '@thirty/api-interfaces';
import { SnackBarService } from '@thirty/core-data';
import { Animations } from '../animations';


@Component({
  selector: 'thirty-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.scss'],
  animations: Animations,
})
export class PokemonsComponent implements OnInit {
  pokemons$: Observable<Pokemon[]> = this.pokemonFacade.allPokemons$;
  pokemon$: Observable<Pokemon> = this.pokemonFacade.selectedPokemon$;
  detailOpen = false;

  constructor(
    private pokemonFacade: PokemonsFacade,
    private router: Router,
    private snackBarService: SnackBarService) { }

  ngOnInit(): void {
    this.pokemonFacade.loadPokemons();
    this.pokemonFacade.mutations$.subscribe((action: any) => this.refresh(action.type.split(' ')));
  }

  refresh(trigger: string){
    const snackBarMessage = 'Pokemon ' + trigger[1] + 'd';
    this.focusoutDetail();
    this.snackBarService.openSnackBar(snackBarMessage, 'Okay', 1000);
    this.pokemonFacade.resetSelectedPokemon();
    this.pokemonFacade.loadPokemons();
  }

  focusDetail(){
    this.detailOpen = true;
  }

  focusoutDetail(){
    this.detailOpen = false;
  }

  select(pokemon: Pokemon): void{
    this.pokemonFacade.selectPokemon(pokemon.id);
    this.focusDetail();
  }

  cancel(): void{
    this.focusoutDetail();
    this.router.navigate(['/pokemons']);
    this.pokemonFacade.resetSelectedPokemon();
  }

}

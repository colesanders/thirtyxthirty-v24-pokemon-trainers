import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { PokemonsFacade } from '@thirty/core-state';
import { Pokemon, getStatColor, PokemonStatColors,
  getStatIcon, PokemonStatIcons } from '@thirty/api-interfaces';
@Component({
  selector: 'thirty-stats-overview',
  templateUrl: './stats-overview.component.html',
  styleUrls: ['./stats-overview.component.scss']
})
export class StatsOverviewComponent implements OnInit {
  pokemon$: Observable<Pokemon> = this.pokemonsFacade.selectedPokemon$;

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private pokemonsFacade: PokemonsFacade,
  ) { }

  ngOnInit(): void {
    this.get()
  }

  getStatIcon(stat: string){
    const statColor = PokemonStatIcons[getStatIcon(stat)];
    return statColor;
  }

  getStatColor(stat: string){
    const statColor = PokemonStatColors[getStatColor(stat)];
    return statColor;
  }

  get(): void {
    const name = this.route.snapshot.paramMap.get('name');
    this.pokemonsFacade.loadPokemon(name);
    this.pokemonsFacade.selectPokemon(name);
  }

  close(){
    this.router.navigate(['/pokemons']);
  }

}

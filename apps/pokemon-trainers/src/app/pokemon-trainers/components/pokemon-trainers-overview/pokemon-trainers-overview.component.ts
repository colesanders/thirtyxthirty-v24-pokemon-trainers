import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonTrainer, Pokemon, 
  getStatColor, PokemonStatColors,
  getStatIcon, PokemonStatIcons } from '@thirty/api-interfaces';
import { PokemonTrainersFacade } from '@thirty/core-state';
import { Observable } from 'rxjs';
import {Sort} from '@angular/material/sort';

@Component({
  selector: 'thirty-pokemons-overview',
  templateUrl: './pokemon-trainers-overview.component.html',
  styleUrls: ['./pokemon-trainers-overview.component.scss']
})
export class PokemonTrainersOverviewComponent implements OnInit, OnChanges {
  pokemonTrainer$: Observable<PokemonTrainer> = this.pokemonTrainersFacade.selectedPokemonTrainer$;
  trainerPokemon$: Observable<Pokemon[]> = this.pokemonTrainersFacade.trainerPokemon$;

  sortedData: Pokemon[];
  pokemons: Pokemon[];

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private pokemonTrainersFacade: PokemonTrainersFacade
  ) { }

  ngOnInit(): void {
    this.get();
    this.pokemonTrainersFacade.mutations$.subscribe((action: any) => this.get());
  }

  ngOnChanges(): void{
    this.get();
  }

  setData(data: Pokemon[]){
    this.pokemons = data;
  }

  sortData(sort: Sort) {
    const data = this.pokemons.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'hp': return compare(a.stats[0].base_stat, b.stats[0].base_stat, isAsc);
        case 'attack': return compare(a.stats[1].base_stat, b.stats[1].base_stat, isAsc);
        case 'defense': return compare(a.stats[2].base_stat, b.stats[2].base_stat, isAsc);
        case 'special-attack': return compare(a.stats[3].base_stat, b.stats[3].base_stat, isAsc);
        case 'special-defense': return compare(a.stats[4].base_stat, b.stats[4].base_stat, isAsc);
        case 'speed': return compare(a.stats[4].base_stat, b.stats[4].base_stat, isAsc);
        default: return 0;
      }
    });
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
    const id = this.route.snapshot.paramMap.get('id');
    this.pokemonTrainersFacade.selectPokemonTrainerById(id);
  }

  close(){
    this.pokemonTrainersFacade.resetSelectedPokemonTrainer();
    this.router.navigate(['/pokemon-trainers']);
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

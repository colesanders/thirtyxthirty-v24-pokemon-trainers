import { Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonTrainer, Pokemon, 
  getStatColor, PokemonStatColors,
  getStatIcon, PokemonStatIcons } from '@thirty/api-interfaces';
import { PokemonTrainersFacade } from '@thirty/core-state';
import { MatTable } from '@angular/material/table';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';


import { Sort } from '@angular/material/sort';

@Component({
  selector: 'thirty-pokemons-overview',
  templateUrl: './pokemon-trainers-overview.component.html',
  styleUrls: ['./pokemon-trainers-overview.component.scss']
})
export class PokemonTrainersOverviewComponent implements OnInit {
  pokemonTrainer$: Observable<PokemonTrainer> = this.pokemonTrainersFacade.selectedPokemonTrainer$;
  trainerPokemon$: Observable<Pokemon[]> = this.pokemonTrainersFacade.trainerPokemon$;

  displayedColumns: string[] = ['name', 'hp', 'attack', 'defense', 'special-attack', 'special-defense', 'speed'];

  @ViewChild(MatTable) table: MatTable<any>;



  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private pokemonTrainersFacade: PokemonTrainersFacade
  ) { }

  ngOnInit(): void {
    this.get();
    this.trainerPokemon$.pipe(
      tap((pokemons) => console.log('init',pokemons))
    )
  }

  sortData(sort: Sort) {

    this.trainerPokemon$.pipe(
      map((pokemons)=>{
        const data = pokemons

        if (!sort.active || sort.direction === '') {
          pokemons = data;
          return pokemons;
        }
      
        pokemons = data.sort((a, b) => {
          const isAsc = sort.direction === 'asc';
          switch (sort.active) {
            case 'name': return compare(a.name, b.name, isAsc);
            case 'hp': return compare(a.stats[0].base_stat, b.stats[0].base_stat, isAsc);
            case 'attack': return compare(a.stats[1].base_stat, b.stats[1].base_stat, isAsc);
            case 'defense': return compare(a.stats[2].base_stat, b.stats[2].base_stat, isAsc);
            case 'special-attack': return compare(a.stats[3].base_stat, b.stats[3].base_stat, isAsc);
            case 'special-defense': return compare(a.stats[4].base_stat, b.stats[4].base_stat, isAsc);
            case 'speed': return compare(a.stats[5].base_stat, b.stats[5].base_stat, isAsc);
            default: return 0;
          }
        })
        return pokemons
      })
    )
    .subscribe((pokemons)=>{
      this.table.renderRows();
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

import { Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonTrainer, Pokemon, 
  getStatColor, PokemonStatColors,
  getStatIcon, PokemonStatIcons } from '@thirty/api-interfaces';
import { PokemonTrainersFacade } from '@thirty/core-state';
import { Observable } from 'rxjs';


import {Sort} from '@angular/material/sort';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'thirty-pokemons-overview',
  templateUrl: './pokemon-trainers-overview.component.html',
  styleUrls: ['./pokemon-trainers-overview.component.scss']
})
export class PokemonTrainersOverviewComponent implements OnInit {
  pokemonTrainer$: Observable<PokemonTrainer> = this.pokemonTrainersFacade.selectedPokemonTrainer$;
  trainerPokemon$: Observable<Pokemon[]> = this.pokemonTrainersFacade.trainerPokemon$;

  displayedColumns: string[] = ['name', "hp", 'attack', 'defense', 'special-attack', 'special-defense', 'speed'];
  pokemons: Pokemon[];
  dataSource;


  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private pokemonTrainersFacade: PokemonTrainersFacade
  ) { }

  ngOnInit(): void {
    this.get();
  }

  setData(data: Pokemon[]): Pokemon[]{
    this.dataSource = new MatTableDataSource(data);
    this.pokemons = data;
    //this.dataSource.sort = this.sort;

    return data;
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


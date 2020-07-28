import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { PokemonTrainersSelectComponent } from '../pokemon-trainers-select/pokemon-trainers-select.component';
import { PokemonTrainer, Pokemon } from '@thirty/api-interfaces';
import { PokemonsFacade, PokemonTrainersFacade } from '@thirty/core-state';
import { Observable } from 'rxjs';
import { map,tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'thirty-pokemon-trainers-detail',
  templateUrl: './pokemon-trainers-detail.component.html',
  styleUrls: ['./pokemon-trainers-detail.component.scss']
})
export class PokemonTrainersDetailComponent implements OnInit, OnChanges{
  @Input() pokemonTrainer: PokemonTrainer;
  @Output() saved = new EventEmitter();
  @Output() cancelled = new EventEmitter();
  pokemons$: Observable<Pokemon[]> = this.pokemonsFacade.allPokemons$;
  trainerPokemon$: Observable<Pokemon[]> = this.pokemonTrainersFacade.trainerPokemon$;

  pokemonTrainerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private pokemonsFacade: PokemonsFacade,
    private pokemonTrainersFacade: PokemonTrainersFacade) { }

  ngOnInit(): void {
    this.createFormGroup();
    this.pokemonsFacade.loadPokemons();

    this.trainerPokemon$.
    subscribe((data: Pokemon[]) => {
      data.forEach((pokemon)=> {
        if(!pokemon.sprites){
          this.pokemonsFacade.loadPokemon(pokemon.name);
        }
      })
    })
  }

  ngOnChanges(){
    if(this.pokemonTrainerForm && this.pokemonTrainer){
      this.pokemonTrainerForm.patchValue(this.pokemonTrainer)
    } else if(this.pokemonTrainerForm){
      this.cancel();
    }
  }

  deletePokemon(index: number) {
    const pokemonControl = this.pokemonTrainerForm.get('pokemons');
    const filteredPokemon = pokemonControl.value.filter((pokemon, i) => i !== index);
    pokemonControl.patchValue(filteredPokemon);
    this.saveTrainer();
  }

  saveTrainer(){
    this.saved.emit(this.pokemonTrainerForm.value);
    this.cancel();
  }

  openDialog(): void {

    const dialogRef = this.dialog.open(PokemonTrainersSelectComponent, {
      height: '100%',
      data: {pokemons$: this.pokemons$}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.pokemonsFacade.loadPokemon(result.name);

        const pokemonControl = this.pokemonTrainerForm.get('pokemons');
        let newPokemonValue;
        if(pokemonControl.value){
          newPokemonValue = [...pokemonControl.value, result.name];
        }else{
          newPokemonValue = [result.name];
        }
        pokemonControl.patchValue(newPokemonValue);
        this.saveTrainer();
      }

    });
  }

  cancel(){
    this.pokemonTrainerForm.reset();
    const pokemonControl = this.pokemonTrainerForm.get('pokemons');
    pokemonControl.patchValue([]);
  }

  createFormGroup(){
    this.pokemonTrainerForm = this.formBuilder.group({
      id: [],
      name: [
        [], 
        [Validators.required,]
      ],
      pokemons: [
        []
      ]
    })
  }
}

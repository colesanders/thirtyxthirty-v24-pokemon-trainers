import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map,tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';

import { PokemonTrainersSelectComponent } from '../pokemon-trainers-select/pokemon-trainers-select.component';
import { PokemonTrainer, Pokemon } from '@thirty/api-interfaces';
import { PokemonsFacade, PokemonTrainersFacade } from '@thirty/core-state';
import { SnackBarService } from '@thirty/core-data';



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
    private pokemonTrainersFacade: PokemonTrainersFacade,
    private snackBarService: SnackBarService) { }

  ngOnInit(): void {
    this.createFormGroup();
    this.pokemonsFacade.loadPokemons();
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

    if(this.pokemonTrainerForm.valid){

      const dialogRef = this.dialog.open(PokemonTrainersSelectComponent, {
        data: {pokemons$: this.pokemons$}
      });


      dialogRef.afterClosed().subscribe(result => {
        const pokemonControl = this.pokemonTrainerForm.get('pokemons');
  
        if(result){
          if(pokemonControl.value.length < 6){
            this.pokemonsFacade.loadPokemon(result.name);
  
            let newPokemonValue;
            if(pokemonControl.value){
              newPokemonValue = [...pokemonControl.value, result.name];
            }else{
              newPokemonValue = [result.name];
            }
            pokemonControl.patchValue(newPokemonValue);
            this.saveTrainer();
          }else{
            this.snackBarService.openSnackBar('Max Pokemon', 'Close', 2000)
          }
          
        }
      });


    }else{
      this.snackBarService.openSnackBar('Choose Trainer Name First', 'Close', 2000)
    }
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

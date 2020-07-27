import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { PokemonTrainersSelectComponent } from '../pokemon-trainers-select/pokemon-trainers-select.component';
import { PokemonTrainer, Pokemon } from '@thirty/api-interfaces';
import { PokemonsFacade } from '@thirty/core-state';
import { Observable } from 'rxjs';
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

  pokemonTrainerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private pokemonsFacade: PokemonsFacade) { }

  ngOnInit(): void {
    this.createFormGroup();
  }

  ngOnChanges(){
    if(this.pokemonTrainerForm && this.pokemonTrainer){
      this.pokemonTrainerForm.patchValue(this.pokemonTrainer)
    } else if(this.pokemonTrainerForm){
      this.cancel();
    }
  }

  deletePokemon(index: number){
    this.pokemonTrainerForm.value.pokemon = [
      ...this.pokemonTrainerForm.value.pokemon.slice(0,index),
      ...this.pokemonTrainerForm.value.pokemon.slice(index+1)
    ]
  }

  openDialog(): void {
    this.pokemonsFacade.loadPokemons();

    const dialogRef = this.dialog.open(PokemonTrainersSelectComponent, {
      height: '100%',
      data: {pokemons$: this.pokemons$}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(this.pokemonTrainerForm.value.pokemon){
        this.pokemonTrainerForm.value.pokemon = [
          ...this.pokemonTrainerForm.value.pokemon,
          result.name
        ];
      }else{
        this.pokemonTrainerForm.value.pokemon = [result.name];
      }
      
    });
  }

  cancel(){
    this.pokemonTrainerForm.reset();
  }

  createFormGroup(){
    this.pokemonTrainerForm = this.formBuilder.group({
      id: [],
      name: new FormControl('', [
        Validators.required,
      ]),
      pokemon: new FormControl([], [
      ])
    })
  }
}

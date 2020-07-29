import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Pokemon, PokemonTrainer } from '@thirty/api-interfaces';
import { PokemonsFacade, PokemonTrainersFacade } from '@thirty/core-state';
import { SelectTrainerComponent } from '../select-trainer/select-trainer.component'
import { SnackBarService } from '@thirty/core-data';

@Component({
  selector: 'thirty-pokemons-detail',
  templateUrl: './pokemons-detail.component.html',
  styleUrls: ['./pokemons-detail.component.scss']
})
export class PokemonsDetailComponent implements OnInit{
  @Input() pokemon: Pokemon;
  @Output() cancelled = new EventEmitter();

  pokemonTrainers$ = this.pokemonTrainersFacade.allPokemonTrainers$;


  constructor(
    private pokemonsFacade: PokemonsFacade,
    private pokemonTrainersFacade: PokemonTrainersFacade,
    private snackBarService: SnackBarService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    if(this.pokemon){
      this.pokemonsFacade.loadPokemon(this.pokemon.name)
    }
  }

  saveTrainer(pokemonTrainer: PokemonTrainer){
    this.pokemonTrainersFacade.updatePokemonTrainer(pokemonTrainer)
  }

  openDialog(): void {
    this.pokemonTrainersFacade.loadPokemonTrainers();

    const dialogRef = this.dialog.open(SelectTrainerComponent, {
      data: {pokemonTrainers$: this.pokemonTrainers$}
    });


    dialogRef.afterClosed().subscribe(result => {
      if(result){
        const trainer: PokemonTrainer = {...result}
        
        if(trainer.pokemons.length < 6){
          trainer.pokemons = [...trainer.pokemons, this.pokemon.name];

          const message: string = 'Pokemon ' + this.pokemon.name + ' added to Trainer ' + trainer.name;
          this.snackBarService.openSnackBar(message, 'Okay', 1000)

          this.saveTrainer(trainer);
        }else{
          this.snackBarService.openSnackBar('Pokemon Trainer Full', 'Okay', 1000)
        }
      }
    });
  }

}

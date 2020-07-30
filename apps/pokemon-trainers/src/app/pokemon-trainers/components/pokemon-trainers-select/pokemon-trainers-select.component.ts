import {Component, OnInit, Inject} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Pokemon } from '@thirty/api-interfaces';

@Component({
  selector: 'thirty-pokemon-trainers-select',
  templateUrl: './pokemon-trainers-select.component.html',
  styleUrls: ['./pokemon-trainers-select.component.scss']
})
export class PokemonTrainersSelectComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<PokemonTrainersSelectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TrainerDialogData
  ) {}

  
  ngOnInit(): void {
  }


  select(pokemon: Pokemon){
    this.dialogRef.close(pokemon)
  }
}

export interface TrainerDialogData {
  pokemons$: Pokemon[],
}

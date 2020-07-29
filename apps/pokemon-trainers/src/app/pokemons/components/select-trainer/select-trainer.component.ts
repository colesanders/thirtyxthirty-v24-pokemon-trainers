import {Component, OnInit, Inject} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { PokemonTrainer } from '@thirty/api-interfaces';

@Component({
  selector: 'thirty-pokemon-trainers-select',
  templateUrl: './select-trainer.component.html',
  styleUrls: ['./select-trainer.component.scss']
})
export class SelectTrainerComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<SelectTrainerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TrainerDialogData
  ) {}

  
  ngOnInit(): void {
  }

  cancel(): void {
    this.dialogRef.close();
  }

  select(pokemonTrainer: PokemonTrainer){
    this.dialogRef.close(pokemonTrainer)
  }
}

export interface TrainerDialogData {
  pokemonTrainers$: PokemonTrainer[],
}

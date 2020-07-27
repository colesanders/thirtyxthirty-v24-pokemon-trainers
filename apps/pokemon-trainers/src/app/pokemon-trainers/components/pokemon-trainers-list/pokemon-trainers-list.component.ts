import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PokemonTrainer } from '@thirty/api-interfaces';

@Component({
  selector: 'thirty-pokemon-trainers-list',
  templateUrl: './pokemon-trainers-list.component.html',
  styleUrls: ['./pokemon-trainers-list.component.scss']
})
export class PokemonTrainersListComponent implements OnInit {
  @Input() pokemonTrainers: [PokemonTrainer];
  @Output() selected = new EventEmitter<PokemonTrainer>();
  @Output() deleted = new EventEmitter<PokemonTrainer>();
  constructor() { }

  ngOnInit(): void {
  }

}

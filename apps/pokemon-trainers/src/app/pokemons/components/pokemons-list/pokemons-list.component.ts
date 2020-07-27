import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Pokemon } from '@thirty/api-interfaces';

@Component({
  selector: 'thirty-pokemons-list',
  templateUrl: './pokemons-list.component.html',
  styleUrls: ['./pokemons-list.component.scss']
})
export class PokemonsListComponent implements OnInit {
  @Input() pokemons: [Pokemon];
  @Output() selected = new EventEmitter<Pokemon>();

  constructor( ) { }

  ngOnInit(): void {
  }

}

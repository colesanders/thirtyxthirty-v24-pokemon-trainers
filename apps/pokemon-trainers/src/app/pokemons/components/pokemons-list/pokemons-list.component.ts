import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Pokemon } from '@thirty/api-interfaces';
import { PokemonsFacade } from '@thirty/core-state';

@Component({
  selector: 'thirty-pokemons-list',
  templateUrl: './pokemons-list.component.html',
  styleUrls: ['./pokemons-list.component.scss']
})
export class PokemonsListComponent implements OnInit {
  @Input() pokemons: [Pokemon];
  @Output() selected = new EventEmitter<Pokemon>();

  length = 964;
  pageSize = 5;
  pageSizeOptions: number[] = [5,10,20];
  pageIndex = 0;

  searchIndex = 0;

  sliceStart = 0;
  sliceEnd = this.pageSize;

  constructor(
    private pokemonsFacade: PokemonsFacade
  ) { }

  ngOnInit(): void {
  }

  updatePageSlice(pageEvent){
    this.pageSize = pageEvent.pageSize

    this.sliceStart = pageEvent.pageIndex * pageEvent.pageSize;
    this.sliceEnd = (pageEvent.pageIndex + 1) * pageEvent.pageSize;

    this.pokemonsFacade.loadPokemonsByBounds([this.sliceStart,this.sliceEnd])
  }

}

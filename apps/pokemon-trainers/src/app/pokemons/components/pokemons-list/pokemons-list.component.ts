import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { FormControl } from '@angular/forms'
import { Pokemon } from '@thirty/api-interfaces';
import { PokemonsFacade } from '@thirty/core-state';
import { Observable } from 'rxjs';
import { startWith, map, tap } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'thirty-pokemons-list',
  templateUrl: './pokemons-list.component.html',
  styleUrls: ['./pokemons-list.component.scss']
})
export class PokemonsListComponent implements OnInit {
  @Input() pokemons: Pokemon[];
  @Output() selected = new EventEmitter<Pokemon>();

  myControl = new FormControl();
  filteredPokemon: Observable<Pokemon[]>;

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
    this.filteredPokemon = this.myControl.valueChanges
    .pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filter(name) : this.pokemons.slice())
    );
  }

  select(pokemon: Pokemon){
    this.selected.emit(pokemon)
  }

  displayFn(pokemon: Pokemon): string {
    return pokemon && pokemon.name ? pokemon.name : '';
  }

  search(){
    this.pokemonsFacade.loadMax();
  }

  private _filter(value: string): Pokemon[] {
    const filterValue = value.toLowerCase();

    return this.pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(filterValue));
  }

  updatePageSlice(pageEvent){
    this.pageSize = pageEvent.pageSize

    this.sliceStart = pageEvent.pageIndex * pageEvent.pageSize;
    this.sliceEnd = (pageEvent.pageIndex + 1) * pageEvent.pageSize;

    this.pokemonsFacade.loadPokemonsByBounds([this.sliceStart,this.sliceEnd])
  }

}

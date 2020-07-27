import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { Pokemon } from '@thirty/api-interfaces';


@Component({
  selector: 'thirty-pokemons-detail',
  templateUrl: './pokemons-detail.component.html',
  styleUrls: ['./pokemons-detail.component.scss']
})
export class PokemonsDetailComponent implements OnInit, OnChanges{
  @Input() pokemon: Pokemon;
  @Output() cancelled = new EventEmitter();


  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  ngOnChanges(){
  }
}

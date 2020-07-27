import { HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@thirty/material';
import { of } from 'rxjs';

import { PokemonsComponent } from './pokemons.component';
import { PokemonsDetailComponent } from './components/pokemons-detail/pokemons-detail.component';
import { PokemonsListComponent } from './components/pokemons-list/pokemons-list.component';
import { PokemonsFacade } from '@thirty/core-state';
import { Pokemon } from '@thirty/api-interfaces';

const mockPokemonsFacade = {
  loadPokemons: () => of({}),
  mutations$: {
    subscribe: () => of({})
  },
  selectPokemon: (id:string) =>  {
    selectedPokemon.id = id;
  }
}

const selectedPokemon: Pokemon = {
  id: '',
  name: '',
  description: '',
  color: '',
  favorite: false,
  icon: '',
  amount: 0,
}

const mockPokemon: Pokemon = {
  id: '0',
  name: 'mock',
  description: '',
  color: '',
  favorite: true,
  icon: '',
  amount: 1,
}

describe('PokemonsComponent', () => {
  let component: PokemonsComponent;
  let fixture: ComponentFixture<PokemonsComponent>;
  let de: DebugElement;
  let pokemonFacade: PokemonsFacade

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientModule,
        MaterialModule,
        NoopAnimationsModule,
        RouterTestingModule,
      ],
      providers: [
        { provide: PokemonsFacade, useValue: mockPokemonsFacade }
      ],
      declarations: [ 
        PokemonsComponent,
        PokemonsListComponent,
        PokemonsDetailComponent
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonsComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    pokemonFacade = de.injector.get(PokemonsFacade);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select', () => {
    component.select(mockPokemon);
    expect(selectedPokemon).toMatchObject(mockPokemon);
  });


  it('should open detail', () => {
    component.focusDetail();
    expect(component.detailOpen).toBe(true);
  });

  it('should close detail', () => {
    component.focusoutDetail();
    expect(component.detailOpen).toBe(false);
  });

});

import { HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '@thirty/material';
import { of } from 'rxjs';

import { PokemonsOverviewComponent } from './pokemons-overview.component';
import { PokemonsFacade, selectPokemon } from '@thirty/core-state';

const mockPokemonsFacade = {
  loadPokemons: () => of({}),
  mutations$: {
    subscribe: () => of({})
  },
  selectPokemon: (id:string) => {}
}

describe('PokemonsOverviewComponent', () => {
  let component: PokemonsOverviewComponent;
  let fixture: ComponentFixture<PokemonsOverviewComponent>;
  let de: DebugElement;
  let pokemonFacade: PokemonsFacade

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokemonsOverviewComponent ],
      imports: [
        HttpClientModule,
        MaterialModule,
        NoopAnimationsModule,
        RouterTestingModule,
      ],
      providers: [
        { provide: PokemonsFacade, useValue: mockPokemonsFacade }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonsOverviewComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    pokemonFacade = de.injector.get(PokemonsFacade);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should call facade.select', () => {
  //   component.get()
  //   expect(pokemonFacade.selectPokemon).toBeCalled();
  // });

});

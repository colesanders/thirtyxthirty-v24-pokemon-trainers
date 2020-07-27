import { HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@thirty/material';

import { PokemonsDetailComponent } from './pokemons-detail.component';

describe('PokemonsDetailComponent', () => {
  let component: PokemonsDetailComponent;
  let fixture: ComponentFixture<PokemonsDetailComponent>;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokemonsDetailComponent ],
      imports: [
        ReactiveFormsModule,
        HttpClientModule,
        MaterialModule,
        NoopAnimationsModule,
        RouterTestingModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonsDetailComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create the formGroup', () => {
    component.createFormGroup();
    expect(component.pokemonForm).toBeTruthy();
  });

  it('should reset formGroup', () => {
    component.cancel();
    expect(component.pokemonForm.value).toMatchSnapshot();
  });


});

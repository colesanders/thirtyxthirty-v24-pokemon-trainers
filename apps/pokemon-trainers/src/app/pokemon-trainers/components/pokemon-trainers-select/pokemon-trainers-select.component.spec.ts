import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonTrainersSelectComponent } from './pokemon-trainers-select.component';

describe('PokemonTrainersSelectComponent', () => {
  let component: PokemonTrainersSelectComponent;
  let fixture: ComponentFixture<PokemonTrainersSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokemonTrainersSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonTrainersSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '@thirty/material';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        HttpClientModule,
        MaterialModule,
        NoopAnimationsModule,
        RouterTestingModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });
});

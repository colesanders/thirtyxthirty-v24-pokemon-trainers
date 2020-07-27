import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './component/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@thirty/material';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule,
  ],
  declarations: [LoginComponent],
  exports: [LoginComponent]
})
export class UiLoginModule {}

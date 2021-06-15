import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgSelectModule,
    FormsModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    NgSelectModule,
    FormsModule
  ],
  providers: []
})

export class SharedModule { }
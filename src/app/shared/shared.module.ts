import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { AvatarModule } from "ngx-avatar";
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgSelectModule,
    FormsModule,
    AvatarModule,
    HttpClientModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    NgSelectModule,
    FormsModule,
    AvatarModule,
    HttpClientModule
  ],
  providers: []
})

export class SharedModule { }
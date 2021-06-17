import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [PagenotfoundComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
      path: '',
      component: PagenotfoundComponent
    }
  ])
  ]
})
export class PagenotfoundModule { }

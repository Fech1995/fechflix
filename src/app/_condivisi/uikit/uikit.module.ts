import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsCardComponent } from './_componenti/bs-card/bs-card.component';
import { RouterModule } from '@angular/router';
import { CardComponent } from './_componenti/card/card.component';

const COMPONENTI=[BsCardComponent, CardComponent]

@NgModule({
  declarations: [
    ...COMPONENTI,
  ],
  exports:[
    ...COMPONENTI
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class UikitModule { }

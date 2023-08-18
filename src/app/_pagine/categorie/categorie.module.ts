import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategorieRoutingModule } from './categorie-routing.module';
import { CategorieComponent } from './categorie.component';
import { UikitModule } from 'src/app/_condivisi/uikit/uikit.module';


@NgModule({
  declarations: [
    CategorieComponent
  ],
  imports: [
    CommonModule,
    CategorieRoutingModule,
    UikitModule
  ]
})
export class CategorieModule { }

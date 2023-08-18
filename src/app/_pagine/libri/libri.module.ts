import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibriRoutingModule } from './libri-routing.module';
import { LibriComponent } from './libri.component';
import { UikitModule } from 'src/app/_condivisi/uikit/uikit.module';


@NgModule({
  declarations: [
    LibriComponent
  ],
  imports: [
    CommonModule,
    LibriRoutingModule,
    UikitModule
  ]
})
export class LibriModule { }

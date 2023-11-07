import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SerieTvRoutingModule } from './serie-tv-routing.module';
import { SerieTvComponent } from './serie-tv.component';
import { UikitModule } from 'src/app/_condivisi/uikit/uikit.module';


@NgModule({
  declarations: [
    SerieTvComponent
  ],
  imports: [
    CommonModule,
    SerieTvRoutingModule,
    UikitModule
  ]
})
export class SerieTvModule { }

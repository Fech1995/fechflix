import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccediRoutingModule } from './accedi-routing.module';
import { AccediComponent } from './accedi.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AccediComponent
  ],
  imports: [
    CommonModule,
    AccediRoutingModule,
    ReactiveFormsModule
  ]
})
export class AccediModule { }

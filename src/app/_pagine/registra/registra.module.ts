import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistraRoutingModule } from './registra-routing.module';
import { RegistraComponent } from './registra.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RegistraComponent
  ],
  imports: [
    CommonModule,
    RegistraRoutingModule,
    ReactiveFormsModule
  ]
})
export class RegistraModule { }

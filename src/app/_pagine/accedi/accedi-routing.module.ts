import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccediComponent } from './accedi.component';

const routes: Routes = [{ path: '', component: AccediComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccediRoutingModule { }

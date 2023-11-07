import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EpisodiComponent } from './episodi.component';

const routes: Routes = [{ path: '', component: EpisodiComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EpisodiRoutingModule { }

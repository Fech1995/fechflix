import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EpisodioDaSerieComponent } from './episodio-da-serie.component';

const routes: Routes = [{ path: '', component: EpisodioDaSerieComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EpisodioDaSerieRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TipologieLibriComponent } from './tipologie-libri.component';

const routes: Routes = [
  {
    path: '',
    component: TipologieLibriComponent,
    children: [{
      path: 'elenco/:id',
      loadChildren: () => import('../libri/libri.module').then(m => m.LibriModule)
    }]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TipologieLibriRoutingModule { }

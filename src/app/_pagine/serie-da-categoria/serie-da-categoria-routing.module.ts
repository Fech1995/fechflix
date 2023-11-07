import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SerieDaCategoriaComponent } from './serie-da-categoria.component';

const routes: Routes = [{ path: '', component: SerieDaCategoriaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SerieDaCategoriaRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibriComponent } from './libri.component';

const routes: Routes = [{ path: '', component: LibriComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibriRoutingModule { }

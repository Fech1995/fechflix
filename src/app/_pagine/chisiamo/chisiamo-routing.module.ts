import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChisiamoComponent } from './chisiamo.component';

const routes: Routes = [{ path: '', component: ChisiamoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChisiamoRoutingModule { }

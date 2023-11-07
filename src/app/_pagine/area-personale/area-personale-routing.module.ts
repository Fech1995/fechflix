import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AreaPersonaleComponent } from './area-personale.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [{ path: '', component: AreaPersonaleComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, ReactiveFormsModule, FormsModule ]
})
export class AreaPersonaleRoutingModule { }

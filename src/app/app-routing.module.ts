import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'home', loadChildren: () => import('./_pagine/home/home.module').then(m => m.HomeModule) },
  { path: '', loadChildren: () => import('./_pagine/home/home.module').then(m => m.HomeModule) },
  { path: 'contatti', loadChildren: () => import('./_pagine/contatti/contatti.module').then(m => m.ContattiModule) },
  { path: 'chisiamo', loadChildren: () => import('./_pagine/chisiamo/chisiamo.module').then(m => m.ChisiamoModule) },
  { path: 'categorie', loadChildren: () => import('./_pagine/categorie/categorie.module').then(m => m.CategorieModule) },
  { path: 'categorie/:id', loadChildren: () => import('./_pagine/libri/libri.module').then(m => m.LibriModule) },
  { path: 'tipologie', loadChildren: () => import('./_pagine/tipologie-libri/tipologie-libri.module').then(m => m.TipologieLibriModule) },
  { path: 'accedi', loadChildren: () => import('./_pagine/accedi/accedi.module').then(m => m.AccediModule) },
  { path: '**', loadChildren: () => import('./_pagine/not-found/not-found.module').then(m => m.NotFoundModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

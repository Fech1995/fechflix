import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'home', loadChildren: () => import('./_pagine/home/home.module').then(m => m.HomeModule) },
  { path: '', loadChildren: () => import('./_pagine/home/home.module').then(m => m.HomeModule) },
  { path: 'contatti', loadChildren: () => import('./_pagine/contatti/contatti.module').then(m => m.ContattiModule) },
  { path: 'chisiamo', loadChildren: () => import('./_pagine/chisiamo/chisiamo.module').then(m => m.ChisiamoModule) },
  { path: 'categorie', loadChildren: () => import('./_pagine/categorie/categorie.module').then(m => m.CategorieModule) },
  // { path: 'categorie/:id', loadChildren: () => import('./_pagine/libri/libri.module').then(m => m.LibriModule) },
  { path: 'tipologie', loadChildren: () => import('./_pagine/tipologie-libri/tipologie-libri.module').then(m => m.TipologieLibriModule) },
  { path: 'accedi', loadChildren: () => import('./_pagine/accedi/accedi.module').then(m => m.AccediModule) },
  { path: 'film', loadChildren: () => import('./_pagine/film/film.module').then(m => m.FilmModule) },
  { path: 'film/:idFilm', loadChildren: () => import('./_pagine/pagina-film/pagina-film.module').then(m => m.PaginaFilmModule) },
  { path: 'categorie/film/:idCategoria', loadChildren: () => import('./_pagine/film-da-categoria/film-da-categoria.module').then(m => m.FilmDaCategoriaModule) },
  { path: 'serieTv', loadChildren: () => import('./_pagine/serie-tv/serie-tv.module').then(m => m.SerieTvModule) },
  { path: 'categorie/serieTv/:idCategoria', loadChildren: () => import('./_pagine/serie-da-categoria/serie-da-categoria.module').then(m => m.SerieDaCategoriaModule) },
  { path: 'serieTv/:idSerie/episodi', loadChildren: () => import('./_pagine/episodi/episodi.module').then(m => m.EpisodiModule) },
  { path: 'serieTv/:idSerie/episodi/:idEpisodio', loadChildren: () => import('./_pagine/episodio-da-serie/episodio-da-serie.module').then(m => m.EpisodioDaSerieModule) },
  { path: 'categorie/serieTv/:idSerie/episodi', loadChildren: () => import('./_pagine/episodi-da-categoria/episodi-da-categoria.module').then(m => m.EpisodiDaCategoriaModule) },
  { path: 'categorie/serieTv/:idSerie/episodi/:idEpisodio', loadChildren: () => import('./_pagine/episodio-da-serie-da-categoria/episodio-da-serie-da-categoria.module').then(m => m.EpisodioDaSerieDaCategoriaModule) },
  { path: 'registrazione', loadChildren: () => import('./_pagine/registra/registra.module').then(m => m.RegistraModule) },
  { path: 'categorie/film/:idCategoria/:idFilm', loadChildren: () => import('./_pagine/pagina-film-da-categoria/pagina-film-da-categoria.module').then(m => m.PaginaFilmDaCategoriaModule) },
  { path: 'contatti/:idContatto', loadChildren: () => import('./_pagine/area-personale/area-personale.module').then(m => m.AreaPersonaleModule) },
  { path: '**', loadChildren: () => import('./_pagine/not-found/not-found.module').then(m => m.NotFoundModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

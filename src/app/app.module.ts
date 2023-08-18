import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MenuAltoComponent } from './_componenti/menu-alto/menu-alto.component';
import { PiePaginaComponent } from './_componenti/pie-pagina/pie-pagina.component';
import { HomeModule } from './_pagine/home/home.module';
import { CategorieModule } from './_pagine/categorie/categorie.module';
import { ChisiamoModule } from './_pagine/chisiamo/chisiamo.module';
import { ContattiModule } from './_pagine/contatti/contatti.module';
import { LibriModule } from './_pagine/libri/libri.module';
import { NotFoundModule } from './_pagine/not-found/not-found.module';
import { HttpClientModule} from '@angular/common/http';
import { AccediModule } from './_pagine/accedi/accedi.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MenuAltoComponent,
    PiePaginaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    // HomeModule,
    // CategorieModule,
    // ChisiamoModule,
    // ContattiModule,
    // LibriModule,
    // AccediModule,
    NotFoundModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

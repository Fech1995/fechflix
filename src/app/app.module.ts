import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MenuAltoComponent } from './_componenti/menu-alto/menu-alto.component';
import { PiePaginaComponent } from './_componenti/pie-pagina/pie-pagina.component';
import { NotFoundModule } from './_pagine/not-found/not-found.module';
import { HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CardHeightDirective } from './_direttive/card-height.directive';

@NgModule({
  declarations: [
    AppComponent,
    MenuAltoComponent,
    PiePaginaComponent,
    CardHeightDirective,
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
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

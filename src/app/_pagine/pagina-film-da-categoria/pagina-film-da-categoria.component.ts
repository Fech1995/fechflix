import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { IRispostaServer } from 'src/app/_interfacce/IRispostaServer.interface';
import { ApiService } from 'src/app/_servizi/api.service';
import { CustomProva3 } from 'src/app/_servizi/custom-validators.service';
import { Film } from 'src/app/_type/film.type';

@Component({
  selector: 'app-pagina-film-da-categoria',
  templateUrl: './pagina-film-da-categoria.component.html',
  styleUrls: ['./pagina-film-da-categoria.component.scss']
})
export class PaginaFilmDaCategoriaComponent implements OnInit {
  token: any;
  id: string | null = null
  risorsa: Film | null = null
  authData = localStorage.getItem('auth');
  attivo: boolean = false

  film$!: Observable<IRispostaServer>

  reactiveForm: FormGroup

  constructor(private route: ActivatedRoute, private api: ApiService, private fb: FormBuilder) {
    if (this.authData) {
      this.id = this.route.snapshot.paramMap.get("idFilm")
      this.token = JSON.parse(this.authData).tk;
      console.log('Token recuperato:', this.authData);
      this.attivo = true
      console.log("Token:", this.token);
      console.log("ID", this.id)

      if (this.id !== null) {
        this.film$ = this.api.getFilmSingolo(this.id, this.token)
      }
    } else {
      console.log("%c Transazione non autorizzata", "color:#ff0000");
      this.attivo = false
    }

    this.reactiveForm = this.fb.group({
      'idReact': ['', [Validators.required, Validators.min(1), Validators.max(1000)]],
      'nomeReact': [''] //controllo custom
    }, {
      validator: CustomProva3("idReact", "nomeReact")
    })

  }

  ngOnInit(): void {
    this.film$.pipe(
      map(x => x.data)
    ).subscribe({
      next: x => {
        console.log('Dati ricevuti:', x);
        this.risorsa = x;
        console.log('Risorsa assegnata:', this.risorsa);
        this.reactiveForm.patchValue({ idReact: x.idFilm, nomeReact: x.titolo });
      },
      error: error => {
        console.error('Errore nella chiamata API:', error);
      },
      complete: () => {
        console.log('Chiamata API completata.');
      }
    });
  }

  //-----------------------------------
  @ViewChild("nome") titolo!: ElementRef

  invia(form: HTMLFormElement): void {
    console.log("FORM INVIATO", form)

    console.log("Valore campo nome", this.titolo.nativeElement.value)
  }
  cambioNome(val: string): void {
    console.log("Campo Nome:", val)
  }

  //---------------------------------------

  inviaReact() {
    console.log("Invio Reactive Form")

    console.log("Dati:", this.reactiveForm.value)
  }
}

import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, concatMap, delay, map, takeUntil, tap } from 'rxjs';
import { IRispostaServer } from 'src/app/_interfacce/IRispostaServer.interface';
import { ApiService } from 'src/app/_servizi/api.service';
import { CustomProva3 } from 'src/app/_servizi/custom-validators.service';
import { Episodio } from 'src/app/_type/episodio.type';

@Component({
  selector: 'app-episodio-da-serie',
  templateUrl: './episodio-da-serie.component.html',
  styleUrls: ['./episodio-da-serie.component.scss']
})
export class EpisodioDaSerieComponent {

  token: any;
  idEpisodio: string | null = null
  idSerie: string | null = null
  risorsa: Episodio | null = null
  authData = localStorage.getItem('auth');
  attivo: boolean = false

  episodi$!: Observable<IRispostaServer>

  reactiveForm: FormGroup

  constructor(private route: ActivatedRoute, private api: ApiService, private fb: FormBuilder) {
    if (this.authData) {
      this.idEpisodio = this.route.snapshot.paramMap.get("idEpisodio")
      this.idSerie = this.route.snapshot.paramMap.get("idSerie")
      this.token = JSON.parse(this.authData).tk;
      console.log('Token recuperato:', this.authData);
      this.attivo = true
      console.log("Token:", this.token);
      console.log("ID Serie", this.idSerie, "ID Episodio", this.idEpisodio)

      if (this.idEpisodio !== null && this.idSerie != null) {
        this.episodi$ = this.api.getEpisodio(this.idSerie, this.token,this.idEpisodio)
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
    this.episodi$.pipe(
      map(x => x.data)
    ).subscribe({
      next: x => {
        console.log('Dati ricevuti:', x);
        this.risorsa = x;
        console.log('Risorsa assegnata:', this.risorsa);
        this.reactiveForm.patchValue({ idReact: x.Episodio, nomeReact: x.titolo });
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



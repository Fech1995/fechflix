import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { IRispostaServer } from 'src/app/_interfacce/IRispostaServer.interface';
import { ApiService } from 'src/app/_servizi/api.service';
import { CustomProva3 } from 'src/app/_servizi/custom-validators.service';
import { FormDataService } from 'src/app/_servizi/form-data.service';
import { Contatto } from 'src/app/_type/contatto.type';

@Component({
  selector: 'app-area-personale',
  templateUrl: './area-personale.component.html',
  styleUrls: ['./area-personale.component.scss']
})
export class AreaPersonaleComponent implements OnInit {
  token: any;
  idContatto: string | null = null
  risorsa: Contatto | null = null
  authData = localStorage.getItem('auth');
  attivo: boolean = false
  idContattoCampo!: number
  nomeCampo!: string // Sostituisci con il tipo di dati appropriato
  cognomeCampo!: string
  idStatoCampo!: number
  sessoCampo!: number
  codiceFiscaleCampo!: string
  partitaIvaCampo!: string
  cittadinanzaCampo!: string
  idNazioneCampo!: number
  cittaNascitaCampo!: string
  provinciaNascitaCampo!: string
  dataNascitaCampo!: Date
  // Aggiungi altre variabili per gli altri campi


  contatti$!: Observable<IRispostaServer>

  reactiveForm: FormGroup

  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private fb: FormBuilder, private formDataService: FormDataService) {
    if (this.authData) {
      this.idContatto = this.route.snapshot.paramMap.get("idContatto");
      this.token = JSON.parse(this.authData).tk;
      console.log('Token recuperato:', this.authData);
      this.attivo = true;
      console.log("Token:", this.token);
      console.log("ID Contatto", this.idContatto);

      if (this.idContatto !== null) {
        this.contatti$ = this.api.getContattoSingolo(this.idContatto, this.token);
      }
    } else {
      console.log("%c Transazione non autorizzata", "color:#ff0000");
      this.attivo = false;
    }

    this.reactiveForm = this.fb.group({
      'idContattoReact': [this.idContattoCampo], // Assegna il valore iniziale
      'nomeReact': [this.nomeCampo], // Assegna il valore iniziale
      'cognomeReact': [this.cognomeCampo], // Assegna il valore iniziale
      'idStatoReact': [this.idStatoCampo], // Assegna il valore iniziale
      'sessoReact': [this.sessoCampo], // Assegna il valore iniziale
      'codiceFiscaleReact': [this.codiceFiscaleCampo], // Assegna il valore iniziale
      'partitaIvaReact': [this.partitaIvaCampo], // Assegna il valore iniziale
      'cittadinanzaReact': [this.cittadinanzaCampo], // Assegna il valore iniziale
      'idNazioneReact': [this.idNazioneCampo], // Assegna il valore iniziale
      'cittaNascitaReact': [this.cittaNascitaCampo], // Assegna il valore iniziale
      'provinciaNascitaReact': [this.provinciaNascitaCampo], // Assegna il valore iniziale
      'dataNascitaReact': [this.dataNascitaCampo], // Assegna il valore iniziale
    });
  }
  ngOnInit(): void {
    this.contatti$.pipe(
      map(x => x.data)
    ).subscribe({
      next: x => {
        console.log('Dati ricevuti:', x);
        this.risorsa = x;
        console.log('Risorsa assegnata:', this.risorsa);
        console.log(x.idContatto);
        this.idContattoCampo = x.idContatto;
        this.nomeCampo = x.nome;
        this.cognomeCampo = x.cognome;
        this.idStatoCampo = x.idStato;
        this.sessoCampo = x.sesso;
        this.codiceFiscaleCampo = x.codiceFiscale;
        this.partitaIvaCampo = x.partitaIva;
        this.cittadinanzaCampo = x.cittadinanza;
        this.idNazioneCampo = x.idNazione;
        this.cittaNascitaCampo = x.cittaNascita;
        this.provinciaNascitaCampo = x.provinciaNascita;
        this.dataNascitaCampo = this.convertiDataDaString(x.dataNascita);

        this.reactiveForm.patchValue({
          'idContattoReact': this.idContattoCampo,
          'nomeReact': this.nomeCampo,
          'cognomeReact': this.cognomeCampo,
          'idStatoReact': this.idStatoCampo,
          'sessoReact': this.sessoCampo,
          'codiceFiscaleReact': this.codiceFiscaleCampo,
          'partitaIvaReact': this.partitaIvaCampo,
          'cittadinanzaReact': this.cittadinanzaCampo,
          'idNazioneReact': this.idNazioneCampo,
          'cittaNascitaReact': this.cittaNascitaCampo,
          'provinciaNascitaReact': this.provinciaNascitaCampo,
          'dataNascitaReact': this.dataNascitaCampo
        });
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
    if (this.reactiveForm.invalid) {
      console.log('FORM NON VALIDO');
    } else {
      const formData = this.reactiveForm.value;
      formData.dataNascitaReact = this.formattaDataAString(formData.dataNascitaReact); // Formatta la data
      console.log('Dati da inviare al server:', formData);

      if (this.idContatto !== null) {
        this.api.putContatto(this.idContatto, formData, this.token).pipe(
          tap(x => console.log(x))
        ).subscribe({
          next: (rit: IRispostaServer) => console.log(rit),
          error: (err: any) => console.log(err),
          complete: () => console.log("completato")
        });
      } else {
        console.log('ID Contatto è null, non è possibile effettuare la richiesta PUT.');
      }

      // Puoi ora gestire il reindirizzamento o altre azioni qui
      this.router.navigateByUrl('/home');
    }
  }

  convertiDataDaString(dataString: string): Date {
    if (dataString) {
      return new Date(dataString);
    } else {
      return new Date();
    }
  }

  // Funzione per formattare una data in una stringa
  formattaDataAString(data: Date): string {
    if (data instanceof Date) {
      return data.toISOString().split('T')[0];
    } else {
      // Gestisci il caso in cui data non sia di tipo Date (ad esempio, restituendo una stringa vuota o un valore predefinito).
      console.error('Il parametro "data" non è di tipo Date:', data);
      return ''; // Oppure restituisci un valore predefinito
    }
  }
  

}
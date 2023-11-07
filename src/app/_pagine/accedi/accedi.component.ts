import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Observer, Subject, catchError, delay, of, take, takeUntil } from 'rxjs';
import { IRispostaServer } from 'src/app/_interfacce/IRispostaServer.interface';
import { ApiService } from 'src/app/_servizi/api.service';
import { AuthStateService } from 'src/app/_servizi/auth-state.service';
import { AuthService } from 'src/app/_servizi/auth.service';
import { UtilityService } from 'src/app/_servizi/utility.service';
import { Auth } from 'src/app/_type/auth.type';

@Component({
  selector: 'app-login',
  templateUrl: './accedi.component.html',
  styleUrls: ['./accedi.component.scss']
})
export class AccediComponent implements OnInit, OnDestroy {

  stoControllando: boolean = false
  reactiveForm: FormGroup
  auth: BehaviorSubject<Auth>
  private distruggi$ = new Subject<void>()

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private api: ApiService,
    private router: Router,
    private authStateService: AuthStateService
  ) {
    this.reactiveForm = this.fb.group({
      'utente': ['', [Validators.required, Validators.email, Validators.minLength(5), Validators.maxLength(40)]],
      'password': ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      'ricordami': [false]

    })
    this.auth = this.authService.leggiObsAuth()
    console.log("Auth", this.auth)
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.distruggi$.next()
  }

  accedi():void {
    // Ottieni il valore del campo "Ricordami"
    const ricordami = this.reactiveForm.value.ricordami;

    // Esegui l'azione per "ricordare" l'utente se la spunta è selezionata
    if (ricordami) {
      console.log('Utente ha selezionato "Ricordami".');
      // Esempio: Puoi memorizzare le informazioni dell'utente in un cookie o local storage
      // o inviarle al tuo server per la gestione del "ricordami".
    }

    if (this.reactiveForm.invalid) {
      console.log("FORM NON VALIDO")
    } else {
      let utente = this.reactiveForm.controls["utente"].value
      let password = this.reactiveForm.controls["password"].value
      this.stoControllando = true
      this.obsLogin(utente, password).subscribe(this.osservoLogin())
      console.log("ACCEDI", utente, password)
    }

    // Resetta il form se necessario
    this.reactiveForm.reset();

    this.authStateService.setValido(true);
  }

  private obsLogin(utente: string, password: string): Observable<IRispostaServer> {
    return this.api.login(utente, password).pipe(
      take(1),
      catchError((err, caught) => {
        console.log("ERR", err, caught)
        const nuovo: IRispostaServer = {
          data: null,
          message: "ERRORE LOGIN",
          error: err
        }
        return of(nuovo)
      }),
      takeUntil(this.distruggi$)
    )
  }

  private osservoLogin() {
    const osservatore: Observer<any> = {
      next: (rit: IRispostaServer) => {
        console.log("RITORNO", rit)
        if (rit.data !== null && rit.message !== null) {
          const tk: string = rit.data.tk
          const contenutoToken = UtilityService.leggiToken(tk)
          const auth: Auth = {
            idLingua: 1,
            tk: rit.data.tk,
            nome: contenutoToken.data.nome,
            idGruppo: contenutoToken.data.idGruppo,
            idStato: contenutoToken.data.idStato,
            abilita: contenutoToken.data.abilita,
            idContatto: contenutoToken.data.idContatto // Aggiungi idContatto a auth
          }
          this.authService.settaObsAuth(auth)
          this.authService.scriviAuthSuLocalStorage(auth)
          this.router.navigateByUrl('/home', {skipLocationChange: false}).then(() => { window.location.reload() })


        } else {
          console.log("ERRORE in osservoLogin")
        }
        this.stoControllando = false
      },
      error: (err) => {
        console.log("Errore", err)
        const auth: Auth = {
          idLingua: 1,
          tk: null,
          nome: null,
          idGruppo: null,
          idStato: null,
          abilita: null,
          idContatto: null
        }
        this.authService.settaObsAuth(auth)
        this.stoControllando = false
      },
      complete: () => {
        this.stoControllando = false
        console.log("completato")
      }
    }
    return osservatore
  }
}

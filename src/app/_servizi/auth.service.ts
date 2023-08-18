import { Injectable } from '@angular/core';
import { Auth } from '../_type/auth.type';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  static auth: Auth
  private obsAuth$:BehaviorSubject<Auth> 

  constructor() { 
    AuthService.auth = this.leggiAuthDaLocalStorage()
    this.obsAuth$=new BehaviorSubject<Auth>(AuthService.auth)
  }
  
  leggiObsAuth(){
    return this.obsAuth$
  }

  settaObsAuth(dati:Auth):void{
    AuthService.auth=dati
    this.obsAuth$.next(dati)
  }


/**
 * Funzione serve a leggere Auth se presente in local storage
 * @returns ritorna un oggetto Auth
 */

  leggiAuthDaLocalStorage(): Auth {
    const tmp: string | null = localStorage.getItem("auth")
    let auth: Auth
    if (tmp !== null) {
      auth = JSON.parse(tmp)
    } else {
      auth = {
        idLingua: 1,
        idUtente: null,
        idGruppo: null,
        idStato: null,
        tk: null,
        nome: null,
        abilita: null
      }
    }
    return auth
  }

  /**
   * Funzione che scrive Auth su localStorage
   * @param auth Oggetto Auth da scrivere
   */
  scriviAuthSuLocalStorage(auth: Auth): void {
    const tmp: string = JSON.stringify(auth)
    localStorage.setItem("auth", tmp)
  }
}

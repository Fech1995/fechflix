import { Injectable } from '@angular/core';
import { Categoria } from '../_type/categoria.type';
import { Immagine } from '../_type/immagine.type';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Libro } from '../_type/libro.type';
import { Observable, concatMap, map, of, take, tap } from 'rxjs';
import { IRispostaServer } from '../_interfacce/IRispostaServer.interface';
import { UtilityService } from './utility.service';
import { ChiamataHTTP } from '../_type/chiamateHTTP.type';
import { environment } from 'src/environments/environment';
import { Film } from '../_type/film.type';
import { Registra } from '../_type/registra.type';
import { Contatto } from '../_type/contatto.type';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  /**
   * Funzione per chiamare l'elenco categoria dei libri
   * @returns Observable
   */

  public getCategorie(): Observable<IRispostaServer> {
    const rit: IRispostaServer = {
      data: this.fakeHttpCategorie(),
      error: null,
      message: null
    }
    return of(rit)
  }
  /**
   * Funzione per chiamare l'elenco dei libri
   * @returns Observable
   */

  public getLibri(): Observable<IRispostaServer> {
    const rit: IRispostaServer = {
      data: this.fakeHttpLibri(),
      error: null,
      message: null
    }
    return of(rit)
  }

  /**
   * La funzione ritorna l'elenco dei libri appartenenti ad una categoria passata
   * 
   * @param idCat id della categoria scelta 
   * @returns Observable
   */

  public getLibriDaCategoria(idCat: number): Observable<IRispostaServer> {
    const tmp = this.fakeHttpLibri().filter(x => x.idCat === idCat) //sto filtrando i libri che hanno idCategoria uguale a quella inserita nel parametro
    const rit: IRispostaServer = {
      data: tmp,
      error: null,
      message: null
    }
    return of(rit)
  }

  /**
   * La funzione ritorna i dati di un singolo libro
   * @param id identificativo del libro scelto
   * @returns Observable
   */

  public getLibro(id: number): Observable<IRispostaServer> {
    const tmp = this.fakeHttpLibri().filter(x => x.id === id) //sto filtrando i libri che hanno id uguale a quella inserita nel parametro
    const rit: IRispostaServer = {
      data: tmp,
      error: null,
      message: null
    }
    return of(rit)
  }
  /**
   * La funzione ritorna i dati di una singola categoria
   * @param id identificativo della categoria scelta
   * @returns Observable
   */

  public getCategoria(id: number): Observable<IRispostaServer> {
    const tmp = this.fakeHttpCategorie().filter(x => x.id === id) //sto filtrando le categorie che hanno id uguale a quella inserita nel parametro
    const rit: IRispostaServer = {
      data: tmp,
      error: null,
      message: null
    }
    return of(rit)
  }


  /**
   * La funzione ritorna un array di categorie simulando una chiamata http
   * @returns Categoria[]
   */
  private fakeHttpCategorie(): Categoria[] {

    const img1: Immagine = {
      src: 'https://via.placeholder.com/360x200/FABDE3', alt: "Visualizza immagine romantica"
    }
    const img2: Immagine = {
      src: 'https://via.placeholder.com/360x200/5880A8', alt: "Visualizza immagine fantasy"
    }
    const img3: Immagine = {
      src: 'https://via.placeholder.com/360x200/6DA75A', alt: "Visualizza immagine avventura"
    }

    const arrCat = [
      { id: 1, nome: "Romantico", img: img1, watch: 0 },
      { id: 2, nome: "Fantasy", img: img2, watch: 0 },
      { id: 3, nome: "Avventura", img: img3, watch: 0 },
    ]
    return arrCat
  }

  /**
   * Funzione che ritorna array di libri simulando una chiamata Http
   * @returns Libro[]
   */

  private fakeHttpLibri(): Libro[] {
    const img1: Immagine = {
      src: 'https://via.placeholder.com/240x150/FABDE3', alt: "Visualizza immagine libro romantica"
    }
    const img2: Immagine = {
      src: 'https://via.placeholder.com/240x150/DB9A00', alt: "Visualizza immagine libro romantica"
    }
    const img3: Immagine = {
      src: 'https://via.placeholder.com/240x150/9DA7FF', alt: "Visualizza immagine libro romantica"
    }
    const img4: Immagine = {
      src: 'https://via.placeholder.com/240x150/FF7000', alt: "Visualizza immagine libro romantica"
    }
    const img5: Immagine = {
      src: 'https://via.placeholder.com/240x150/9DA75A', alt: "Visualizza immagine libro romantica"
    }
    const img6: Immagine = {
      src: 'https://via.placeholder.com/240x150/FABDE3', alt: "Visualizza immagine libro romantica"
    }
    const img7: Immagine = {
      src: 'https://via.placeholder.com/240x150/FABDE3', alt: "Visualizza immagine libro romantica"
    }
    const arrLibri: Libro[] = [
      { id: 1, idCat: 1, titolo: "Il libro romantico", autore: "Mario rossi", img: img1 },
      { id: 2, idCat: 3, titolo: "Il libro avventura", autore: "Paolo rossi", img: img2 },
      { id: 3, idCat: 2, titolo: "Il libro fantascienza", autore: "Luca Bianchi", img: img3 },
      { id: 4, idCat: 3, titolo: "L'avventura", autore: "Giuseppe Verdi", img: img4 },
      { id: 5, idCat: 1, titolo: "Il romanticismo", autore: "Sandro Sandri", img: img5 },
      { id: 6, idCat: 2, titolo: "La fantascienza", autore: "Pippo Pippi", img: img6 },
      { id: 7, idCat: 2, titolo: "Gormiti", autore: "Mario rossi", img: img7 },
    ]
    return arrLibri
  }


  //apiLaravel

  /**
   * 
   * @param risorsa (string|number)[] 
   * @returns string stringa che rappresenta l'endpoint del server
   */
  protected calcolaRisorsa(risorsa: (string | number)[]): string {
    // const server: string = "http://localhost/progetti/ambienteDiSviluppo/esercizi-corso/primoProgetto/public/api"
    const server: string = environment.apiUrl
    const versione: string = "v1"

    let url = server + "/" + versione + "/"

    // risorsa.forEach(x => { url = url + x + "/" })
    url = url + risorsa.join("/")
    return url

  }

  /**
   * 
   * @param risorsa (string|number)[] risorsa di cui voglio sapere i dati
   * @param tipo string GET | PUT | POST | DELETE tipo di chiamata http
   * @param parametri Object | null Parametri da passare al endpoint
   * @returns Observable
   */
  protected richiestaGenerica(risorsa: (string | number)[], tipo: ChiamataHTTP, parametri: Object | null = null): Observable<IRispostaServer> {



    const url = this.calcolaRisorsa(risorsa)
    console.log("URL", url)
    switch (tipo) {
      case 'GET': console.log("PASSO DA QUI 1")
        return this.http.get<IRispostaServer>(url)
        break
      case 'POST':
        if (parametri !== null) {
          console.log("PASSO DA QUI 2", url)
          return this.http.post<IRispostaServer>(url, parametri).pipe(tap(x => console.log("SERVICE", x)))
        } else {
          const objErrore = { data: null, message: null, error: "NO_PARAMETRI" }
          const obs$ = new Observable<IRispostaServer>(subscriber => subscriber.next(objErrore))
          return obs$
        }

        break
      case 'PUT':
        if (parametri !== null) {
          console.log("PASSO DA QUI 4", url)
          return this.http.put<IRispostaServer>(url, parametri).pipe(tap(x => console.log("SERVICE", x)))
        } else {
          const objErrore = { data: null, message: null, error: "NO_PARAMETRI" }
          const obs$ = new Observable<IRispostaServer>(subscriber => subscriber.next(objErrore))
          return obs$
        }
        break
      case 'DELETE': console.log("PASSO DA QUI 5", url)
        return this.http.delete<IRispostaServer>(url)
        break
      default: console.log("PASSO DA QUI 3")
        return this.http.get<IRispostaServer>(url)
        break
    }
  }

  public richiestaGenericaProtected(risorsa: (string | number)[], tipo: ChiamataHTTP, parametri: Object | null = null, token: string): Observable<IRispostaServer> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': token
      })
    }

    const url = this.calcolaRisorsa(risorsa)
    console.log("URL", url)
    switch (tipo) {
      case 'GET': console.log("PASSO DA QUI 1")
        return this.http.get<IRispostaServer>(url, httpOptions)
        break
      case 'POST':
        if (parametri !== null) {
          console.log("PASSO DA QUI 2", url)
          return this.http.post<IRispostaServer>(url, parametri, httpOptions).pipe(tap(x => console.log("SERVICE", x)))
        } else {
          const objErrore = { data: null, message: null, error: "NO_PARAMETRI" }
          const obs$ = new Observable<IRispostaServer>(subscriber => subscriber.next(objErrore))
          return obs$
        }

        break
      case 'PUT':
        if (parametri !== null) {
          console.log("PASSO DA QUI 4", url)
          return this.http.put<IRispostaServer>(url, parametri, httpOptions).pipe(tap(x => console.log("SERVICE", x)))
        } else {
          const objErrore = { data: null, message: null, error: "NO_PARAMETRI" }
          const obs$ = new Observable<IRispostaServer>(subscriber => subscriber.next(objErrore))
          return obs$
        }
        break
      case 'DELETE': console.log("PASSO DA QUI 5", url)
        return this.http.delete<IRispostaServer>(url, httpOptions)
        break
      default: console.log("PASSO DA QUI 3")
        return this.http.get<IRispostaServer>(url, httpOptions)
        break
    }
  }

  /**
   * Funzione per chiamare elenco film
   * 
   * @param token string
   * @returns Observable 
   */

  public getFilm(token: string): Observable<IRispostaServer> {

    const risorsa: string[] = ["film"]

    return this.richiestaGenericaProtected(risorsa, "GET", null, token)
  }

  public getFilmDaCategoria(idCat: number, token: string): Observable<IRispostaServer> {
    const risorsa: (string | number)[] = ['categorie', 'film', idCat]; // Aggiorna l'array risorsa con la nuova struttura dell'URL.

    // Qui, useremo la funzione richiestaGenericaProtected per effettuare la chiamata HTTP.
    return this.richiestaGenericaProtected(risorsa, 'GET', null, token);
  }
  /**
 * Funzione per chiamare elenco contatti
 * 
 * @param token string
 * @returns Observable 
 */
  public getContatti(token: string): Observable<IRispostaServer> {

    const risorsa: string[] = ["contatti"]

    return this.richiestaGenericaProtected(risorsa, "GET", null, token)
  }

  /**
 * Funzione per chiamare il contatto
 * 
 * @param id stringa che indica l'id richiesto
 * @param token string
 * @returns Observable 
 */
  public getContattoSingolo(id: string, token: string): Observable<IRispostaServer> {

    const risorsa: string[] = ["contatti", id]

    return this.richiestaGenericaProtected(risorsa, "GET", null, token)
  }

  /**
* Funzione per aggiungere un nuovo contatto
* 
* @param parametri partial dei film
* @param token string
* @returns Observable 
*/
  public postContatto(parametri: Partial<Contatto>, token: string): Observable<IRispostaServer> {
    const risorsa: string[] = ["contatti"]
    return this.richiestaGenericaProtected(risorsa, "POST", parametri, token)
  }

  /**
 * Funzione per modificare contatto
 * 
 * @param id number indica l'id che si intende modificare
 * @param token string
 * @param parametri partial dei film
 * @returns Observable
 */
  public putContatto(id: string, parametri: Partial<Contatto>, token: string): Observable<IRispostaServer> {

    // const idRisorsa= id + "" // si usa per trasformare un tipo number in un tipo string
    const risorsa: string[] = ["contatti", id]
    return this.richiestaGenericaProtected(risorsa, "PUT", parametri, token)
  }

  /**
* 
* Funzione per cancellare il contatto
* 
* @param id number indica l'id che si vuole cancellare
* @param token string
* @returns 
*/

  public deleteContatti(id: string, token: string): Observable<IRispostaServer> {

    const risorsa: string[] = ["contatti", id]

    return this.richiestaGenericaProtected(risorsa, "DELETE", null, token)
  }



  /**
   * Funzione per chiamare il film
   * 
   * @param id stringa che indica l'id richiesto
   * @param token string
   * @returns Observable 
   */
  public getFilmSingolo(id: string, token: string): Observable<IRispostaServer> {

    const risorsa: string[] = ["film", id]

    return this.richiestaGenericaProtected(risorsa, "GET", null, token)
  }

  /**
   * Funzione per aggiungere un nuovo film
   * 
   * @param parametri partial dei film
   * @param token string
   * @returns Observable 
   */
  public postFilm(parametri: Partial<Film>, token: string): Observable<IRispostaServer> {
    const risorsa: string[] = ["film"]
    return this.richiestaGenericaProtected(risorsa, "POST", parametri, token)
  }

  /**
   * Funzione per modificare film
   * 
   * @param id number indica l'id che si intende modificare
   * @param token string
   * @param parametri partial dei film
   * @returns Observable
   */
  public putFilm(id: number, parametri: Partial<Film>, token: string): Observable<IRispostaServer> {

    // const idRisorsa= id + "" // si usa per trasformare un tipo number in un tipo string
    const risorsa: [string, number] = ["film", id]
    return this.richiestaGenericaProtected(risorsa, "PUT", parametri, token)

  }

  /**
   * 
   * Funzione per cancellare i film
   * 
   * @param id number indica l'id che si vuole cancellare
   * @param token string
   * @returns 
   */

  public deleteFilm(id: string, token: string): Observable<IRispostaServer> {

    const risorsa: string[] = ["film", id]

    return this.richiestaGenericaProtected(risorsa, "DELETE", null, token)
  }

  /**
   * Funzione per uploadare
   * 
   * @param dati formData entranti
   * @returns Observable
   */

  public upload(dati: FormData): Observable<IRispostaServer> {
    const risorsa: string[] = ["upload"]
    return this.richiestaGenerica(risorsa, "POST", dati)
  }
  /**
   * Funzione per registrare
   * 
   * @param dati formData entranti
   * @returns Observable
   */
  public registrazione(parametri: Partial<Registra>): Observable<IRispostaServer> {
    console.log(parametri)
    const risorsa: string[] = ["registrazione"]
    return this.richiestaGenerica(risorsa, "POST", parametri)
  }

  /**
   * Funzione che manda l'utente al server per l'autenticazione
   * @param hashUtente Stringa che rappresenta l'HASH sha512Utente
   * @returns Ritorna Observable
   */
  public getLoginFase1(hashUtente: string): Observable<IRispostaServer> {
    const risorsa: string[] = ["accedi", hashUtente]
    const rit = this.richiestaGenerica(risorsa, "GET")
    return rit
  }

  /**
   * Funzione che manda utente e password cifrata al server
   * @param hashUtente Stringa che rappresenta l'HASH sha512 del Utente
   * @param hashPassword Stringa che rappresenta l'HASH sha512 della password unita al sale
   * @returns Ritorna Observable
   */
  public getLoginFase2(hashUtente: string, hashPassword: string): Observable<IRispostaServer> {
    const risorsa: string[] = ["accedi", hashUtente, hashPassword]
    const rit = this.richiestaGenerica(risorsa, "GET")
    return rit
  }

  /**
   * Funzione che effettua il login
   * @param utente Stringa che rappresenta l'utente
   * @param password Stringa che rappresenta la password
   * @returns Ritorna Observable
   */
  public login(utente: string, password: string): Observable<IRispostaServer> {
    const hashUtente: string = UtilityService.hash(utente)
    const hashPassword: string = UtilityService.hash(password)
    const controllo$ = this.getLoginFase1(hashUtente)
      .pipe(
        take(1),
        tap(x => console.log("Dati:", x)),
        map((rit: IRispostaServer): string => {
          const sale: string = rit.data.sale
          const passwordNascosta = UtilityService.nascondiPassword(hashPassword, sale)
          return passwordNascosta
        }),
        concatMap((passwordNascosta: string) => { //rit è la password nascosta di map
          return this.getLoginFase2(hashUtente, passwordNascosta)
        })
      )
    return controllo$
  }

  public getCategorieVere(token: string): Observable<IRispostaServer> {

    const risorsa: string[] = ["categorie"]

    return this.richiestaGenericaProtected(risorsa, "GET", null, token)
  }

  public getCategoriaVera(id: string, token: string): Observable<IRispostaServer> {

    const risorsa: string[] = ["categorie", id]

    return this.richiestaGenericaProtected(risorsa, "GET", null, token)
  }

  /**
 * Funzione per chiamare elenco film
 * 
 * @param token string
 * @returns Observable 
 */

  public getSerie(token: string): Observable<IRispostaServer> {

    const risorsa: string[] = ["serieTv"]

    return this.richiestaGenericaProtected(risorsa, "GET", null, token)
  }

  public getSerieDaCategoria(idCat: number, token: string): Observable<IRispostaServer> {
    const risorsa: (string | number)[] = ['categorie', 'serieTv', idCat]; // Aggiorna l'array risorsa con la nuova struttura dell'URL.

    // Qui, useremo la funzione richiestaGenericaProtected per effettuare la chiamata HTTP.
    return this.richiestaGenericaProtected(risorsa, 'GET', null, token);
  }

  public getEpisodi(idSerie: number, token: string): Observable<IRispostaServer> {
    const risorsa: (string | number)[] = ['serieTv', idSerie, 'episodi']; // Aggiorna l'array risorsa con la nuova struttura dell'URL.

    // Qui, useremo la funzione richiestaGenericaProtected per effettuare la chiamata HTTP.
    return this.richiestaGenericaProtected(risorsa, 'GET', null, token);
  }

  public getEpisodio(idSerie: string, token: string, idEpisodio: string): Observable<IRispostaServer> {

    const risorsa: string[] = ['serieTv', idSerie, 'episodi', idEpisodio]

    return this.richiestaGenericaProtected(risorsa, "GET", null, token)
  }

}

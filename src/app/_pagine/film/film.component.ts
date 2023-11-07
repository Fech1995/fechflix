import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, delay, map, take, takeUntil, tap, } from 'rxjs';
import { IRispostaServer } from 'src/app/_interfacce/IRispostaServer.interface';
import { ApiService } from 'src/app/_servizi/api.service';
import { Bottone } from 'src/app/_type/bottone.type';
import { CardVera } from 'src/app/_type/cardVera.type';
import { Film } from 'src/app/_type/film.type';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.scss']
})
export class FilmComponent implements OnInit, OnDestroy {


  // valido:boolean = false
  // token: any;
  // dati: Film[] = []

  // attivo: boolean = false
  // authData = localStorage.getItem('auth');
  // elencoFilm$!: Observable<IRispostaServer>

  private distruggi$ = new Subject<void>()

  // constructor(private api: ApiService) {
  //   if (this.authData) {
  //     this.token = JSON.parse(this.authData).tk;
  //     console.log("auth", this.token);
  //     this.attivo = true
  //   } else {
  //     console.log("%c Transazione non autorizzata", "color:#ff0000");
  //     this.attivo = false
  //   }
  // }

  // ngOnInit(): void {
  //   if (this.token) {
  //     this.elencoFilm$ = this.api.getFilm(this.token);
  //     this.elencoFilm$.pipe(
  //       takeUntil(this.distruggi$)
  //     ).subscribe({
  //       next: (data: IRispostaServer) => {
  //         console.log("data", data);
  //         this.attivo = true;
  //         this.dati = data.data;
  //       },
  //       error: (error: string) => console.log("errore", error),
  //       complete: () => console.log("%c Completato", "color:#00ff00", this.dati)
  //     });
  //   } else {
  //     console.log("%c Non si passa", "color:#ff0000");
  //     this.attivo = false;
  //   }
  // }

  ngOnDestroy(): void {
    this.distruggi$.next()
  }

  // populate(): void {
  //   this.elencoFilm$.pipe(
  //     map(x => x.data)
  //   ).subscribe({
  //     next: (data: Film) => {
  //       console.log("data", data)
  //       this.attivo = true
  //     },
  //     error: (err: string) => console.log("errore", err),
  //     complete: () => console.log("%c Completato", "color:#00ff00", this.dati)
  //   })
  // }

  // aggiungiValore() {
  //   console.log("Aggiungi valore")

  //   const parametro: Partial<Film> = {
  //     titolo: "Nuovo film",
  //     descrizione: "Nuovo film",
  //     durata: 120,
  //     regista: "Aldo Cataldo",
  //     attori: "The Rock",
  //     anno: 2020
  //   }
  //   this.obsAddFilm(parametro).subscribe({
  //     next: (data: Film) => {
  //       console.log("OBS", data);
  //       // Aggiungi il nuovo film alla lista senza ricaricare la pagina
  //       this.dati.push(data);
  //     },
  //     error: (err: string) => console.log("errore", err)
  //   })
  // }

  // obsAddFilm(dati: Partial<Film>) {
  //   return this.api.postFilm(dati, this.token).pipe(
  //     take(1),
  //     tap(x => console.log("OBS", x)),
  //     map(x => x.data),
  //     takeUntil(this.distruggi$)
  //   )
  // }

  // modificaValore() {
  //   console.log("Modifica valore")
  //   const parametro: Partial<Film> = {
  //     titolo: "Modificato film",
  //     descrizione: "Nuovo film",
  //     durata: 120,
  //     regista: "Aldo Cataldo",
  //     attori: "The Rock",
  //     anno: 2020
  //   }

  //   const id: number = 13 //l'ultimo elemento inserito
  //   this.obsModFilm(id, parametro).subscribe({
  //     next: (data: Film) => {
  //       console.log("OBS", data);
  //       // Aggiorna il film modificato nella lista senza ricaricare la pagina
  //       const index = this.dati.findIndex(film => film.idFilm === id);
  //       if (index !== -1) {
  //         this.dati[index] = data;
  //       }
  //     },
  //     error: (err: string) => console.log("errore", err)
  //   })
  // }

  // obsModFilm(id: number, dati: Partial<Film>) {
  //   return this.api.putFilm(id, dati, this.token).pipe(
  //     take(1),
  //     tap(x => console.log("OBS", x)),
  //     map(x => x.data),
  //     takeUntil(this.distruggi$)
  //   )
  // }

  // idRisorsa: number | null = null

  // cancellaValore(id: number | null) {
  //   console.log("cancella", id)

  //   if (id !== null) {
  //     this.obsDelFilm(id).subscribe({
  //       next: () => {
  //         console.log("OBS", "Cancellato");
  //         // Rimuovi il film eliminato dalla lista senza ricaricare la pagina
  //         const index = this.dati.findIndex(film => film.idFilm === id);
  //         if (index !== -1) {
  //           this.dati.splice(index, 1);
  //         }
  //       },
  //       error: (err: string) => console.log(err)
  //     })
  //   }
  // }

  // obsDelFilm(id: number) {
  //   const idRisorsa = id + ""
  //   return this.api.deleteFilm(idRisorsa, this.token).pipe(
  //     take(1),
  //     tap(x => console.log("OBS", x)),
  //     takeUntil(this.distruggi$)
  //   )
  // }
  films: CardVera[] = []
  film$!: Observable<IRispostaServer>
  token: any
  authData = localStorage.getItem('auth')
  valido:boolean = false

  constructor(private api: ApiService) {
    if (this.authData) {
      this.token = JSON.parse(this.authData).tk;
      console.log("auth", this.token);
      this.valido = true
    } else {
      console.log("%c Transazione non autorizzata", "color:#ff0000");
    }
  }

  ngOnInit(): void {
    if (this.token){
      this.film$ = this.api.getFilm(this.token)
      this.film$.subscribe(this.osservoCat())
    }

  }

  //-------------------------------------------------

  //OBSERVER

  private osservoCat() {
    return {
      next: (rit: IRispostaServer) => {
        console.log("NEXT", rit)
        const elementi = rit.data
        for (let i = 0; i < elementi.length; i++) {
          // const tmpImg:Immagine=elementi[i].img
          // const tmpImg: Immagine = {
          //   src: elementi[i].img.src,
          //   alt: elementi[i].img.alt
          // }
          const bott: Bottone = {
            testo: "Visualizza",
            title: "Visualizza " + elementi[i].titolo,
            icona: null,
            tipo: "button",
            emitId: null,
            link: elementi[i].idFilm
          }
          const card: CardVera = {
            srcImmagine: elementi[i].srcImmagine,
            testo: elementi[i].descrizione,
            titolo: elementi[i].titolo,
            bottone: bott
          }
          this.films.push(card)
        }
      },
      error: (err: any) => { console.error("ERRORE", err) },
      complete: () => { console.log("%c Completato", "color:#00aa00") }
    }
  }

  //-------------------------------------------------

}


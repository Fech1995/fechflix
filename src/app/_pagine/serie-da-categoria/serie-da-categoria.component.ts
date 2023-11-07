import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, concatMap, delay, map, takeUntil, tap } from 'rxjs';
import { IRispostaServer } from 'src/app/_interfacce/IRispostaServer.interface';
import { ApiService } from 'src/app/_servizi/api.service';
import { Bottone } from 'src/app/_type/bottone.type';
import { CardVera } from 'src/app/_type/cardVera.type';

@Component({
  selector: 'app-serie-da-categoria',
  templateUrl: './serie-da-categoria.component.html',
  styleUrls: ['./serie-da-categoria.component.scss']
})
export class SerieDaCategoriaComponent implements OnInit, OnDestroy {
  // id: string | null
  series: CardVera[] = []
  authData = localStorage.getItem('auth');
  token: any
  attivo: boolean = false
  // elem$!: Observable<IRispostaServer>

  private distruggi$ = new Subject<void>()

  constructor(private api: ApiService, private route: ActivatedRoute) {
    if (this.authData) {
      this.token = JSON.parse(this.authData).tk;
      console.log("auth", this.token);
      this.attivo = true
    } else {
      console.log("%c Transazione non autorizzata", "color:#ff0000");
      this.attivo = false
    }
  }

  ngOnInit(): void {
    if (this.token) {
      this.recuperaDati().pipe(
        delay(1000),
      ).subscribe(this.osservoFilm())
    }
  }

  ngOnDestroy(): void {
    this.distruggi$.next()
  }

  private recuperaDati(): Observable<IRispostaServer> {
    return this.route.params.pipe(
      map(x => x['idCategoria']),
      tap(x => console.log("%c RECUPERO ID" + x, "color: #0000aa")),
      concatMap((x: string, index: number): Observable<IRispostaServer> => {
        return this.api.getSerieDaCategoria(parseInt(x), this.token)
      }),
      takeUntil(this.distruggi$)
    )
  }


  //---------------------------------------------------

  //Observer

  private osservoFilm() {
    return {
      next: (rit: IRispostaServer) => {
        this.series = []
        const elementi = rit.data
        for (let i = 0; i < elementi.length; i++) {

          const bott: Bottone = {
            testo: "Visualizza Episodi",
            title: "Visualizza " + elementi[i].titolo,
            icona: null,
            tipo: "button",
            emitId: null,
            link: "episodi/"
          };

          const card: CardVera = {
            srcImmagine: elementi[i].srcImmagine,
            testo: elementi[i].descrizione,
            titolo: elementi[i].titolo,
            bottone: bott
          }
          this.series.push(card)
        }
      },
      error: (err: any) => console.error("ERRORE", err),
      complete: () => console.log("%c Completato", "color: #00aa00")
    }
  }
}

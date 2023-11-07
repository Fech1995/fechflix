import { Component, ElementRef, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, concatMap, delay, map, takeUntil, tap } from 'rxjs';
import { IRispostaServer } from 'src/app/_interfacce/IRispostaServer.interface';
import { ApiService } from 'src/app/_servizi/api.service';
import { Bottone } from 'src/app/_type/bottone.type';
import { CardVera } from 'src/app/_type/cardVera.type';

@Component({
  selector: 'app-film-da-categoria',
  templateUrl: './film-da-categoria.component.html',
  styleUrls: ['./film-da-categoria.component.scss']
})
export class FilmDaCategoriaComponent {

  // id: string | null
  films: CardVera[] = []
  authData = localStorage.getItem('auth');
  token: any
  attivo:boolean = false
  // elem$!: Observable<IRispostaServer>

  private distruggi$ = new Subject<void>()

  constructor(private api: ApiService, private route: ActivatedRoute, private el:ElementRef, private renderer:Renderer2) {
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
    if(this.token){
      this.recuperaDati().subscribe(this.osservoFilm())
      this.adjustCardHeights()
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
        return this.api.getFilmDaCategoria(parseInt(x), this.token)
      }),
      takeUntil(this.distruggi$)
    )
  }

  private adjustCardHeights() {
    // Ottieni tutte le righe di card
    const rows = this.el.nativeElement.querySelectorAll('.row');

    // Itera attraverso le righe
    rows.forEach((row: any) => {
      const cardsInRow = row.querySelectorAll('.col-12.col-sm-6.col-md-4.col-lg-3.mb-4.mt-4');
      let maxHeight = 0;

      // Calcola l'altezza massima tra le card nella riga
      cardsInRow.forEach((card: any) => {
        const cardHeight = card.clientHeight;
        maxHeight = Math.max(maxHeight, cardHeight);
      });

      // Applica l'altezza massima a tutte le card nella riga
      cardsInRow.forEach((card: any) => {
        this.renderer.setStyle(card, 'height', maxHeight + 'px');
      });
    });
  }

  //---------------------------------------------------

  //Observer

  private osservoFilm() {
    return {
      next: (rit: IRispostaServer) => {
        this.films = []
        const elementi = rit.data
        for (let i = 0; i < elementi.length; i++) {

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
      error: (err: any) => console.error("ERRORE", err),
      complete: () => console.log("%c Completato", "color: #00aa00")
    }
  }

}

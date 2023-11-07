import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, concatMap, delay, map, takeUntil, tap } from 'rxjs';
import { IRispostaServer } from 'src/app/_interfacce/IRispostaServer.interface';
import { ApiService } from 'src/app/_servizi/api.service';
import { Bottone } from 'src/app/_type/bottone.type';
import { CardVera } from 'src/app/_type/cardVera.type';

@Component({
  selector: 'app-episodi-da-categoria',
  templateUrl: './episodi-da-categoria.component.html',
  styleUrls: ['./episodi-da-categoria.component.scss']
})
export class EpisodiDaCategoriaComponent {
  // id: string | null
  episodi: CardVera[] = []
  authData = localStorage.getItem('auth');
  token: any
  attivo:boolean = false
  elem$!: Observable<IRispostaServer>

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
    if(this.token){
      this.recuperaDati().subscribe(this.osservoFilm())
    }
  }

  ngOnDestroy(): void {
    this.distruggi$.next()
  }

  private recuperaDati(): Observable<IRispostaServer> {
    return this.route.params.pipe(
      map(x => x['idSerie']),
      tap(x => console.log("%c RECUPERO ID" + x, "color: #0000aa")),
      concatMap((x: string, index: number): Observable<IRispostaServer> => {
        return this.api.getEpisodi(parseInt(x), this.token)
      }),
      takeUntil(this.distruggi$)
    )
  }


  //---------------------------------------------------

  //Observer

  private osservoFilm() {
    return {
      next: (rit: IRispostaServer) => {
        console.log(rit)
        this.episodi = []
        const episodi = rit.data; // Assicurati che rit.data contenga dati sugli episodi
  
        for (let i = 0; i < episodi.length; i++) {

          const bott: Bottone = {
            testo: "Visualizza Episodio",
            title: "Visualizza " + episodi[i].titolo,
            icona: null,
            tipo: "button",
            emitId: null,
            link: episodi[i].idEpisodio
          };

          const card: CardVera = {
            srcImmagine: episodi[i].srcImmagine,
            testo: episodi[i].descrizione,
            titolo: episodi[i].titolo,
            bottone: bott
          }
          this.episodi.push(card);
        }
      },
      error: (err: any) => console.error("ERRORE", err),
      complete: () => console.log("%c Completato", "color: #00aa00")
    };
  }
  

}

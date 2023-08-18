import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, concatMap, delay, map, takeUntil, tap } from 'rxjs';
import { IRispostaServer } from 'src/app/_interfacce/IRispostaServer.interface';
import { ApiService } from 'src/app/_servizi/api.service';
import { Card } from 'src/app/_type/card.type';
import { Immagine } from 'src/app/_type/immagine.type';

@Component({
  selector: 'libri',
  templateUrl: './libri.component.html',
  styleUrls: ['./libri.component.scss']
})
export class LibriComponent implements OnInit, OnDestroy {

  // id: string | null
  libri: Card[] = []
  // elem$!: Observable<IRispostaServer>

  private distruggi$ = new Subject<void>()

  constructor(private api: ApiService, private route: ActivatedRoute) {
    // this.id = this.route.snapshot.paramMap.get("id")
    // if (this.id !== null) {
    //   this.elem$ = this.api.getLibriDaCategoria(parseInt(this.id))
    //   console.log("passo di qui")
    // }
  }

  ngOnInit(): void {
    // if (this.elem$ !== null && this.elem$ !== undefined) {
    //   this.elem$.pipe(
    //     delay(1000),
    //     tap(x=>console.log("TAP", x))
    //       takeUntil(this.distruggi$)
    //   ).subscribe(this.osservoLibri())
    // }
    this.recuperaDati().pipe(
      delay(1000),
    ).subscribe(this.osservoLibri())
  }

  ngOnDestroy(): void {
    this.distruggi$.next()
  }

  private recuperaDati(): Observable<IRispostaServer> {
    return this.route.params.pipe(
      map(x => x['id']),
      tap(x => console.log("%c RECUPERO ID" + x, "color: #0000aa")),
      concatMap((x: string, index: number): Observable<IRispostaServer> => {
        return this.api.getLibriDaCategoria(parseInt(x))
      }),
      takeUntil(this.distruggi$)
    )
  }


  //---------------------------------------------------

  //Observer

  private osservoLibri() {
    return {
      next: (rit: IRispostaServer) => {
        this.libri = []
        const elementi = rit.data
        for (let i = 0; i < elementi.length; i++) {
          const tmpImg: Immagine = {
            src: elementi[i].img.src,
            alt: elementi[i].img.alt,
          }
          const card: Card = {
            immagine: tmpImg,
            testo: elementi[i].autore,
            titolo: elementi[i].titolo,
            bottone: undefined
          }
          this.libri.push(card)
        }
      },
      error: (err: any) => console.error("ERRORE", err),
      complete: () => console.log("%c Completato", "color: #00aa00")
    }
  }

}

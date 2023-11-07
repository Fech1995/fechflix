import { Component, OnInit } from '@angular/core';
import { Observable, delay } from 'rxjs';
import { IRispostaServer } from 'src/app/_interfacce/IRispostaServer.interface';
import { ApiService } from 'src/app/_servizi/api.service';
import { Bottone } from 'src/app/_type/bottone.type';
import { CardVera } from 'src/app/_type/cardVera.type';

@Component({
  selector: 'app-serie-tv',
  templateUrl: './serie-tv.component.html',
  styleUrls: ['./serie-tv.component.scss']
})
export class SerieTvComponent implements OnInit {
  series: CardVera[] = []
  serie$!: Observable<IRispostaServer>
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
      this.serie$ = this.api.getSerie(this.token)
      this.serie$.pipe(
        delay(1000),
      ).subscribe(this.osservoCat())
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
            link: elementi[i].idSerie + '/episodi'
          }
          const card: CardVera = {
            srcImmagine: elementi[i].srcImmagine,
            testo: elementi[i].descrizione,
            titolo: elementi[i].titolo,
            bottone: bott
          }
          this.series.push(card)
        }
      },
      error: (err: any) => { console.error("ERRORE", err) },
      complete: () => { console.log("%c Completato", "color:#00aa00") }
    }
  }
}

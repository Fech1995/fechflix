import { Component, OnInit } from '@angular/core';
import { Observable, delay } from 'rxjs';
import { IRispostaServer } from 'src/app/_interfacce/IRispostaServer.interface';
import { ApiService } from 'src/app/_servizi/api.service';
import { Bottone } from 'src/app/_type/bottone.type';
import { Card } from 'src/app/_type/card.type';
import { Immagine } from 'src/app/_type/immagine.type';

@Component({
  selector: 'categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.scss']
})
export class CategorieComponent implements OnInit {

  categorie: Card[] = []
  cat$: Observable<IRispostaServer>

  constructor(private api: ApiService) {
    this.cat$ = this.api.getCategorie()
  }

  ngOnInit(): void {
    this.cat$.pipe(
      delay(1000)
    ).subscribe(this.osservoCat())
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
          const tmpImg: Immagine = {
            src: elementi[i].img.src,
            alt: elementi[i].img.alt
          }
          const bott: Bottone = {
            testo: "Visualizza",
            title: "Visualizza " + elementi[i].nome,
            icona: null,
            tipo: "button",
            emitId: null,
            link: "/categorie/" + elementi[i].id
          }
          const card: Card = {
            immagine: tmpImg,
            testo: '',
            titolo: elementi[i].nome,
            bottone: bott
          }
          this.categorie.push(card)
        }
      },
      error: (err: any) => { console.error("ERRORE", err) },
      complete: () => { console.log("%c Completato", "color:#00aa00") }
    }
  }

  //-------------------------------------------------

}

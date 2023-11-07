import { Component, OnInit } from '@angular/core';
import { Observable, delay, map } from 'rxjs';
import { IRispostaServer } from 'src/app/_interfacce/IRispostaServer.interface';
import { ApiService } from 'src/app/_servizi/api.service';
import { Bottone } from 'src/app/_type/bottone.type';
import { CardVera } from 'src/app/_type/cardVera.type';

@Component({
  selector: 'categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.scss']
})
export class CategorieComponent implements OnInit {

  categorie: CardVera[] = []
  cat$!: Observable<IRispostaServer>
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
      this.cat$ = this.api.getCategorieVere(this.token)
      this.cat$.subscribe(this.osservoCat())
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
          const bott: Bottone = {
            testo: "Film",
            title: "Visualizza " + elementi[i].nome,
            icona: null,
            tipo: "button",
            emitId: null,
            link: "film/" + elementi[i].idCategoria
          };
        
          const bottone2: Bottone = {
            testo: "SerieTv",
            title: "Visualizza " + elementi[i].nome,
            icona: null,
            tipo: "button",
            emitId: null,
            link: "serieTv/" + elementi[i].idCategoria
          };
        
          const card: CardVera = {
            srcImmagine: elementi[i].srcImmagine,
            testo: '',
            titolo: elementi[i].nome,
            bottone: bott,
            bottone2: bottone2
          };
        
          this.categorie.push(card);
        }
        
      },
      error: (err: any) => { console.error("ERRORE", err) },
      complete: () => { console.log("%c Completato", "color:#00aa00") }
    }
  }

  //-------------------------------------------------

}

import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/_servizi/api.service';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.scss']
})
export class FilmComponent implements OnInit {

  constructor(private api:ApiService) { }

  token:any = JSON.parse(localStorage.getItem('auth') as string).tk

  ngOnInit(): void {
    console.log("auth", this.token)
    if (!this.token){
      console.log("%c transazione non autorizzata","color:#ff0000", this.token)
    } else {
      this.api.getFilm(this.token)
      .subscribe({
        next: (data) => console.log("data", data),
        error: (err) => console.log("errore", err),
        complete: () => console.log("%c Completato", "color:#00ff00")
      })
    }
  }

}

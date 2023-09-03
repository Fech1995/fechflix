import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/_servizi/api.service';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.scss']
})
export class FilmComponent implements OnInit {

  constructor(private api: ApiService) { }

  token: any;
  attivo: boolean = false

  ngOnInit(): void {
    const authData = localStorage.getItem('auth');
    if (authData) {
      this.token = JSON.parse(authData).tk;
      console.log("auth", this.token);
      this.api.getFilm(this.token)
        .subscribe({
          next: (data) => {
            console.log("data", data)
            this.attivo = true
        },
          error: (err) => console.log("errore", err),
          complete: () => console.log("%c Completato", "color:#00ff00")
        });
    } else {
      console.log("%c Transazione non autorizzata", "color:#ff0000");
    }
  }
}


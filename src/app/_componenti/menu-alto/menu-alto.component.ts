import { ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/_servizi/api.service';

@Component({
  selector: 'menu-alto',
  templateUrl: './menu-alto.component.html',
  styleUrls: ['./menu-alto.component.scss']
})
export class MenuAltoComponent implements OnInit, OnChanges {

  authData = localStorage.getItem('auth')
  token: any
  valido: boolean = false
  idContatto!: number





  constructor(private router: Router, private api: ApiService, private cdr: ChangeDetectorRef) {
    if (this.authData) {
      this.token = JSON.parse(this.authData).tk;
      console.log("auth", this.token);
      this.valido = true
      this.idContatto = JSON.parse(this.authData).idContatto
      

    } else {
      console.log("%c Transazione non autorizzata", "color:#ff0000");
    }
  }

  ngOnInit(): void {

  }

  logout(): void {
    localStorage.removeItem('auth');
    this.router.navigateByUrl('/home', { skipLocationChange: false }).then(() => { window.location.reload() })
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['valido']) {
      // Puoi inserire una console.log per verificare i cambiamenti in valido
      console.log('Valido è cambiato:', this.valido);
    }
  }
}

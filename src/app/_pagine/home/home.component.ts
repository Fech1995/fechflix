import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/_servizi/api.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  valido:boolean = false 
  token:any
  authData = localStorage.getItem('auth')

  constructor(private router:Router, private api:ApiService) {
    if (this.authData) {
      this.token = JSON.parse(this.authData).tk;
      console.log("auth", this.token);
      this.valido = true
    } else {
      console.log("%c Transazione non autorizzata", "color:#ff0000");
    }
   }

  ngOnInit(): void {
    this.router.navigate(['/home']);
  }
}

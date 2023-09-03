import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'menu-alto',
  templateUrl: './menu-alto.component.html',
  styleUrls: ['./menu-alto.component.scss']
})
export class MenuAltoComponent implements OnInit {


  constructor(private router:Router) { }

  ngOnInit(): void {

  }

  logout():void{
    localStorage.removeItem('auth');
    this.router.navigateByUrl('/home')
  }

}

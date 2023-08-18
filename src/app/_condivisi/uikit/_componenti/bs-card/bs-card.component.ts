import { Component, Input, OnInit } from '@angular/core';
import { Card } from 'src/app/_type/card.type';

@Component({
  selector: 'bs-card',
  templateUrl: './bs-card.component.html',
  styleUrls: ['./bs-card.component.scss']
})
export class BsCardComponent implements OnInit {


  @Input ('opzioni') card!: Card

  constructor() { }

  ngOnInit(): void {

  }
  clickButton(id:number):void{
    console.log("VALORE ID " + id)
  }
}

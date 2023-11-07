import { Component, Input } from '@angular/core';
import { CardVera } from 'src/app/_type/cardVera.type';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  @Input ('opzioni') card!: CardVera

  constructor() { }

  ngOnInit(): void {

  }
  clickButton(id:number):void{
    console.log("VALORE ID " + id)
  }
}

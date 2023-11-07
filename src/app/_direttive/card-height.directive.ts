import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appCardHeight]'
})
export class CardHeightDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.adjustCardHeight();
  }

  ngAfterViewInit() {
    this.adjustCardHeight();
  }

  private adjustCardHeight() {
    setTimeout(() => {
      const row = this.el.nativeElement.closest('.row');
      if (row) {
        const cards = Array.from(row.querySelectorAll('.col-12.col-sm-6.col-md-4.col-lg-3.mb-4.mt-4'));
        const cardHeights = cards.map((card: any) => card.clientHeight);
        const maxHeight = Math.max(...cardHeights);
        cards.forEach((card: any) => {
          this.renderer.setStyle(card, 'height', `${maxHeight}px`);
        });
      }
    });
  }
}


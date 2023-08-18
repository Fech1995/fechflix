import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipologieLibriComponent } from './tipologie-libri.component';

describe('TipologieLibriComponent', () => {
  let component: TipologieLibriComponent;
  let fixture: ComponentFixture<TipologieLibriComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TipologieLibriComponent]
    });
    fixture = TestBed.createComponent(TipologieLibriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

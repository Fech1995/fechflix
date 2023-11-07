import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpisodiDaCategoriaComponent } from './episodi-da-categoria.component';

describe('EpisodiDaCategoriaComponent', () => {
  let component: EpisodiDaCategoriaComponent;
  let fixture: ComponentFixture<EpisodiDaCategoriaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EpisodiDaCategoriaComponent]
    });
    fixture = TestBed.createComponent(EpisodiDaCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

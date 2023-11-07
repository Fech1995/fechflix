import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpisodioDaSerieDaCategoriaComponent } from './episodio-da-serie-da-categoria.component';

describe('EpisodioDaSerieDaCategoriaComponent', () => {
  let component: EpisodioDaSerieDaCategoriaComponent;
  let fixture: ComponentFixture<EpisodioDaSerieDaCategoriaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EpisodioDaSerieDaCategoriaComponent]
    });
    fixture = TestBed.createComponent(EpisodioDaSerieDaCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

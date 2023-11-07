import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaFilmDaCategoriaComponent } from './pagina-film-da-categoria.component';

describe('PaginaFilmDaCategoriaComponent', () => {
  let component: PaginaFilmDaCategoriaComponent;
  let fixture: ComponentFixture<PaginaFilmDaCategoriaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaginaFilmDaCategoriaComponent]
    });
    fixture = TestBed.createComponent(PaginaFilmDaCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

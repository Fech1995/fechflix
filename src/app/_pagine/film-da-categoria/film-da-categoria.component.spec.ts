import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmDaCategoriaComponent } from './film-da-categoria.component';

describe('FilmDaCategoriaComponent', () => {
  let component: FilmDaCategoriaComponent;
  let fixture: ComponentFixture<FilmDaCategoriaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilmDaCategoriaComponent]
    });
    fixture = TestBed.createComponent(FilmDaCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

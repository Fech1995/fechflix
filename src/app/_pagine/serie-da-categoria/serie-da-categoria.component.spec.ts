import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SerieDaCategoriaComponent } from './serie-da-categoria.component';

describe('SerieDaCategoriaComponent', () => {
  let component: SerieDaCategoriaComponent;
  let fixture: ComponentFixture<SerieDaCategoriaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SerieDaCategoriaComponent]
    });
    fixture = TestBed.createComponent(SerieDaCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

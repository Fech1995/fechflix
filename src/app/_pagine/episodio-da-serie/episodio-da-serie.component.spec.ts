import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpisodioDaSerieComponent } from './episodio-da-serie.component';

describe('EpisodioDaSerieComponent', () => {
  let component: EpisodioDaSerieComponent;
  let fixture: ComponentFixture<EpisodioDaSerieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EpisodioDaSerieComponent]
    });
    fixture = TestBed.createComponent(EpisodioDaSerieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistraComponent } from './registra.component';

describe('RegistraComponent', () => {
  let component: RegistraComponent;
  let fixture: ComponentFixture<RegistraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistraComponent]
    });
    fixture = TestBed.createComponent(RegistraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

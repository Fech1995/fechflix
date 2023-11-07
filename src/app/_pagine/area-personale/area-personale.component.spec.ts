import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaPersonaleComponent } from './area-personale.component';

describe('AreaPersonaleComponent', () => {
  let component: AreaPersonaleComponent;
  let fixture: ComponentFixture<AreaPersonaleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AreaPersonaleComponent]
    });
    fixture = TestBed.createComponent(AreaPersonaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

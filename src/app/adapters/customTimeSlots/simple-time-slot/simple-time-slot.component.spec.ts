import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DentistTimeSlotComponent } from './simple-time-slot.component';

describe('DentistTimeSlotComponent', () => {
  let component: DentistTimeSlotComponent;
  let fixture: ComponentFixture<DentistTimeSlotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DentistTimeSlotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DentistTimeSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

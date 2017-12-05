import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleTimeSlotComponent } from './simple-time-slot.component';

describe('SimpleTimeSlotComponent', () => {
  let component: SimpleTimeSlotComponent;
  let fixture: ComponentFixture<SimpleTimeSlotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleTimeSlotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleTimeSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

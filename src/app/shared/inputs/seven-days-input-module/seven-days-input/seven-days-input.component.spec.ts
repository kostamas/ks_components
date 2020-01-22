import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SevenDaysInputComponent } from './seven-days-input.component';

describe('SevenDaysInputComponent', () => {
  let component: SevenDaysInputComponent;
  let fixture: ComponentFixture<SevenDaysInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SevenDaysInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SevenDaysInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

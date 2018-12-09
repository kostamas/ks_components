import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HbSearchButtonComponent } from './hb-search-button.component';

describe('HbSearchButtonComponent', () => {
  let component: HbSearchButtonComponent;
  let fixture: ComponentFixture<HbSearchButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HbSearchButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HbSearchButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

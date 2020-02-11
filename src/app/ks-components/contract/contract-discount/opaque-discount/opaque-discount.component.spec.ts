import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpaqueDiscountComponent } from './opaque-discount.component';

describe('OpaqueDiscountComponent', () => {
  let component: OpaqueDiscountComponent;
  let fixture: ComponentFixture<OpaqueDiscountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpaqueDiscountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpaqueDiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiSelectRegularOptionsComponent } from './multi-select-regular-options.component';

describe('MultiSelectRegularOptionsComponent', () => {
  let component: MultiSelectRegularOptionsComponent;
  let fixture: ComponentFixture<MultiSelectRegularOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiSelectRegularOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiSelectRegularOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

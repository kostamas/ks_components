import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleSelectColorfulOptionsComponent } from './multiple-select-colorful-options.component';

describe('MultipleSelectColorfulOptionsComponent', () => {
  let component: MultipleSelectColorfulOptionsComponent;
  let fixture: ComponentFixture<MultipleSelectColorfulOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultipleSelectColorfulOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleSelectColorfulOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

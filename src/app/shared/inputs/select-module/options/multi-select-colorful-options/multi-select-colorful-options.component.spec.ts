import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiSelectColorfulOptionsComponent } from './multi-select-colorful-options.component';

describe('MultiSelectColorfulOptionsComponent', () => {
  let component: MultiSelectColorfulOptionsComponent;
  let fixture: ComponentFixture<MultiSelectColorfulOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiSelectColorfulOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiSelectColorfulOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

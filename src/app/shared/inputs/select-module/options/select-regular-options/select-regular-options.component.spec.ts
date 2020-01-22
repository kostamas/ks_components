import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectRegularOptionsComponent } from './select-regular-options.component';

describe('SelectRegularOptionsComponent', () => {
  let component: SelectRegularOptionsComponent;
  let fixture: ComponentFixture<SelectRegularOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectRegularOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectRegularOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

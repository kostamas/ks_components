import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleSelectResultsComponent } from './multiple-select-results.component';

describe('MultipleSelectResultsComponent', () => {
  let component: MultipleSelectResultsComponent;
  let fixture: ComponentFixture<MultipleSelectResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultipleSelectResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleSelectResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

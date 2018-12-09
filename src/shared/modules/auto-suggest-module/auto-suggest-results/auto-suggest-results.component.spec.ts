import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoSuggestResultsComponent } from './auto-suggest-results.component';

describe('AutoSuggestResultsComponent', () => {
  let component: AutoSuggestResultsComponent;
  let fixture: ComponentFixture<AutoSuggestResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoSuggestResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoSuggestResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

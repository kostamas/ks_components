import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoSuggestResultsComponent } from './auto-suggest-results.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('AutoSuggestResultsComponent', () => {
  let component: AutoSuggestResultsComponent;
  let fixture: ComponentFixture<AutoSuggestResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ AutoSuggestResultsComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoSuggestResultsComponent);
    component = fixture.componentInstance;
    component.data = {inputWidth: '400px'};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import {AutoSuggestResultsComponent} from './auto-suggest-results/auto-suggest-results.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';

import { AutoSuggestService } from './auto-suggest.service';
import {SvgIconModule} from '../svgIconModule/svg-icon.module';
import {LoaderModule} from '../loader-module/loader.module';

describe('AutoSuggestResultsComponent', () => {
  let component: AutoSuggestResultsComponent;
  let fixture: ComponentFixture<AutoSuggestResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
		HttpClientTestingModule,
		SvgIconModule,
		LoaderModule
],
      declarations: [ AutoSuggestResultsComponent ],
 		providers: [AutoSuggestService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoSuggestResultsComponent);
    component = fixture.componentInstance;
    component.data = {inputWidth: '400px'};
    fixture.detectChanges();
  });

  it('should be created', inject([AutoSuggestService], (service: AutoSuggestService) => {
    expect(service).toBeTruthy();
  }));
});

import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HbSearchButtonComponent} from './hb-search-button.component';
import {LoaderModule} from '../loader-module/loader..module';
import {SvgIconModule} from '../svgIconModule/svg-icon.module';

describe('HbSearchButtonComponent', () => {
  let component: HbSearchButtonComponent;
  let fixture: ComponentFixture<HbSearchButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SvgIconModule,
        LoaderModule
      ],
      declarations: [HbSearchButtonComponent]
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

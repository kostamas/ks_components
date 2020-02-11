import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoSuggestInputComponent } from './auto-suggest-input.component';
import {SvgIconModule} from '../../../svg-icon-module/svg-icon.module';
import {LoaderModule} from '../../../loader-module/loader.module';
import {FormsModule} from '@angular/forms';

describe('AutoSuggestInputComponent', () => {
  let component: AutoSuggestInputComponent;
  let fixture: ComponentFixture<AutoSuggestInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SvgIconModule,
        LoaderModule,
        FormsModule
      ],
      declarations: [ AutoSuggestInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoSuggestInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ButtonWithLoaderComponent} from './button-with-loader.component';
import {LoaderModule} from '../../loader-module/loader.module';
import {SvgIconModule} from '../../svg-icon-module/svg-icon.module';

describe('ButtonWithLoaderComponent', () => {
  let component: ButtonWithLoaderComponent;
  let fixture: ComponentFixture<ButtonWithLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SvgIconModule,
        LoaderModule
      ],
      declarations: [ButtonWithLoaderComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonWithLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

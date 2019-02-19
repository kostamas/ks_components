import { TestBed, inject } from '@angular/core/testing';

import { PopupService } from './popup.service';
import {LoaderModule} from '../loader-module/loader..module';
import {SvgIconModule} from '../svg-icon-module/svg-icon.module';

describe('PopupService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        SvgIconModule,
        LoaderModule
      ],
      providers: [PopupService]
    });
  });

  it('should be created', inject([PopupService], (service: PopupService) => {
    expect(service).toBeTruthy();
  }));
});

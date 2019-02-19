import {inject, TestBed} from '@angular/core/testing';

import {ModalService} from './modal.service';
import {SvgIconModule} from '../svg-icon-module/svg-icon.module';
import {LoaderModule} from '../loader-module/loader..module';

describe('ModalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SvgIconModule,
        LoaderModule
      ],
      providers: [ModalService]
    });
  });

  it('should be created', inject([ModalService], (service: ModalService) => {
    expect(service).toBeTruthy();
  }));
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransparentShapeModalAdapterComponent } from './transparent-shape-modal-adapter.component';
import {CommonModule} from '@angular/common';
import {MatDialogModule, MatSliderModule} from '@angular/material';
import {FormsModule} from "@angular/forms";
import {TransparentShapeModalService} from "../../ks-components/transparent-shape-modal/transparent-shape-modal.service";
import {WindowRef} from "../../core/window-ref.service";

describe('TransparentShapeModalAdapterComponent', () => {
  let component: TransparentShapeModalAdapterComponent;
  let fixture: ComponentFixture<TransparentShapeModalAdapterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
        MatDialogModule,
        CommonModule,
        FormsModule,
        MatSliderModule
      ],
      declarations: [
        TransparentShapeModalAdapterComponent
      ],
      providers:[
        TransparentShapeModalService,
        WindowRef
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransparentShapeModalAdapterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

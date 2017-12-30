import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TransparentShapeModalComponent} from './transparent-shape-modal.component';
import {WindowRef} from '../../core/window-ref.service';
import {TransparentShapeModalService} from './transparent-shape-modal.service';

describe('TransparentShapeModalComponent', () => {
  let component: TransparentShapeModalComponent;
  let fixture: ComponentFixture<TransparentShapeModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TransparentShapeModalComponent
      ],
      providers: [
        TransparentShapeModalService,
        WindowRef
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransparentShapeModalComponent);

    component = fixture.componentInstance;
    component.position = {left:30,top:30};
    component.circleRadius= 50;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

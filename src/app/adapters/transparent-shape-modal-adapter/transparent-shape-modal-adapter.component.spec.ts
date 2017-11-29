import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransparentShapeModalAdapterComponent } from './transparent-shape-modal-adapter.component';

describe('TransparentShapeModalAdapterComponent', () => {
  let component: TransparentShapeModalAdapterComponent;
  let fixture: ComponentFixture<TransparentShapeModalAdapterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransparentShapeModalAdapterComponent ]
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

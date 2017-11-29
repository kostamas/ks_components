import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransparentShapeModalComponent } from './transparent-shape-modal.component';

describe('TransparentShapeModalComponent', () => {
  let component: TransparentShapeModalComponent;
  let fixture: ComponentFixture<TransparentShapeModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransparentShapeModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransparentShapeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

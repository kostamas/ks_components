import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpandedImageModalComponent } from './expanded-image-modal.component';

describe('ExpandedImageModalComponent', () => {
  let component: ExpandedImageModalComponent;
  let fixture: ComponentFixture<ExpandedImageModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpandedImageModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpandedImageModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

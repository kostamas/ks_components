import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageZoomerAdapterComponent } from './image-zoomer-adapter.component';

describe('ImageZoomerAdapterComponent', () => {
  let component: ImageZoomerAdapterComponent;
  let fixture: ComponentFixture<ImageZoomerAdapterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageZoomerAdapterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageZoomerAdapterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

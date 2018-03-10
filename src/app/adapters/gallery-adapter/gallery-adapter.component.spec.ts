import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryAdapterComponent } from './gallery-adapter.component';

describe('GalleryAdapterComponent', () => {
  let component: GalleryAdapterComponent;
  let fixture: ComponentFixture<GalleryAdapterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GalleryAdapterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryAdapterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

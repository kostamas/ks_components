import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GalleryAdapterComponent} from './gallery-adapter.component';
import {GalleryModule} from '../../ks-components/gallery/gallery.module';

describe('GalleryAdapterComponent', () => {
  let component: GalleryAdapterComponent;
  let fixture: ComponentFixture<GalleryAdapterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [GalleryModule],
      declarations: [GalleryAdapterComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryAdapterComponent);
    component = fixture.componentInstance;
    component.imagesPaths = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

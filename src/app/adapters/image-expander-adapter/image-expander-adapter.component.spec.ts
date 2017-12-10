import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ImageExpanderAdapterComponent } from './image-expander-adapter.component';
import {MatDialogModule} from '@angular/material';
import {ExpandedImageModalComponent} from '../../ks-components/image-expander/expanded-image-modal/expanded-image-modal.component';
import {ImageExpanderDirective} from "../../ks-components/image-expander/image-expander.directive";

describe('ImageExpanderAdapterComponent', () => {
  let component: ImageExpanderAdapterComponent;
  let fixture: ComponentFixture<ImageExpanderAdapterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
        MatDialogModule
      ],
      declarations: [
        ImageExpanderAdapterComponent,
        ExpandedImageModalComponent,
        ImageExpanderDirective
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageExpanderAdapterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

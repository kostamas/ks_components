import {
  Directive, ElementRef, Renderer2, OnDestroy, Input, AfterViewInit, OnChanges,
  SimpleChanges
} from '@angular/core';
import {MatDialog} from '@angular/material';
import {ExpandedImageModalComponent} from './expanded-image-modal/expanded-image-modal.component';

@Directive({
  selector: '[appImageExpander]',
})
export class ImageExpanderDirective implements AfterViewInit, OnChanges, OnDestroy {
  private listeners: any = [];

  @Input() expand = true;
  @Input() MIN_IMG_SIZE = 100;
  @Input() MAX_IMG_SIZE = 600;

  constructor(private element: ElementRef, private renderer: Renderer2, public dialog: MatDialog) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes.expand && changes.expand.currentValue && this.listeners.length === 0) {
      this.triggerImageExpander();
    }
  }

  ngAfterViewInit() {
    if (this.expand && this.listeners.length === 0) {
      this.triggerImageExpander();
    }
  }

  private triggerImageExpander() {
    const images = this.element.nativeElement.querySelectorAll('img');
    images.forEach((imageElement) => {
      if (!imageElement.complete) {
        const listenerFn = this.renderer.listen(imageElement, 'load', (loadEvent) => {
          const loadedImage = loadEvent.target;
          this.expandImageHandler(loadedImage);
          listenerFn();
        });
      } else {
        this.expandImageHandler(imageElement);
      }
    });
  }

  private expandImageHandler(loadedImage) {
    if (this.shouldExpandImage(loadedImage)) {
      const iconElement = this.addIconToImage(loadedImage);
      this.addClickHandler(iconElement, loadedImage);  // clickable icon
      this.addClickHandler(loadedImage, loadedImage); // clickable image
    }
  }

  private addClickHandler(clickableElement, image) {
    this.listeners.push(this.renderer.listen(clickableElement, 'click', () => this.expandImage(image)));
  }

  private expandImage(img) {
    this.dialog.open(ExpandedImageModalComponent, {
      panelClass: 'expanded-image-modal',
      data: {img}
    });
  }

  private addIconToImage(image) {
    const imageDimensions = this.getImageDimensions(image);

    const imageNewParent = this.renderer.createElement('div');   // wrap img and icon with one div element
    const imageParent = image.parentNode;

    this.renderer.setStyle(imageNewParent, 'position', 'relative');
    this.renderer.setStyle(imageNewParent, 'border', '1px dotted rgba(0, 0, 0, 0.4)');
    this.renderer.setStyle(imageNewParent, 'padding', '5px');
    this.renderer.setStyle(imageNewParent, 'width', `${imageDimensions.width}px`);
    this.renderer.setStyle(imageNewParent, 'height', `${image.style.height}px`);

    imageParent.append(imageNewParent);
    imageParent.replaceChild(imageNewParent, image);
    imageNewParent.append(image);

    const iconWrapper = this.renderer.createElement('div');   // wrap img and icon with one div element

    const iconWrapperStyle = this.renderer.createElement('style');   // wrap img and icon with one div element
    iconWrapperStyle.innerHTML = '.expand-icon-wrapper svg:hover{opacity:0.5;}';

    this.renderer.addClass(iconWrapper, 'expand-icon-wrapper');
    iconWrapper.innerHTML = `<svg  width="40px" height="40px" viewBox="0 0 16 16">
                              <path fill="#00d8f0" d="M5.3 6.7l1.4-1.4-3-3 1.3-1.3h-4v4l1.3-1.3z"/>
                              <path fill="#00d8f0" d="M6.7 10.7l-1.4-1.4-3 3-1.3-1.3v4h4l-1.3-1.3z"/>
                              <path fill="#00d8f0" d="M10.7 9.3l-1.4 1.4 3 3-1.3 1.3h4v-4l-1.3 1.3z"/>
                              <path fill="#00d8f0" d="M11 1l1.3 1.3-3 3 1.4 1.4 3-3 1.3 1.3v-4z"/>
                            </svg>`;
    this.renderer.setAttribute(iconWrapper, 'style',
      'cursor: pointer; position: absolute; bottom: 0; right: 0; width:40px; height:40px;');

    iconWrapper.append(iconWrapperStyle);
    imageNewParent.append(iconWrapper);

    return iconWrapper;
  }

  private shouldExpandImage(image) {
    const imageDimensions = this.getImageDimensions(image);
    return !(imageDimensions.height === null || imageDimensions.width === null ||
    imageDimensions.height < this.MIN_IMG_SIZE || imageDimensions.width < this.MIN_IMG_SIZE ||
    imageDimensions.height > this.MAX_IMG_SIZE || imageDimensions.width > this.MAX_IMG_SIZE);
  }

  private getImageDimensions(image) {
    return {width: image.clientWidth, height: image.clientHeight};
  }

  ngOnDestroy() {
    this.listeners.forEach(removeListenerFn => removeListenerFn());
  }
}

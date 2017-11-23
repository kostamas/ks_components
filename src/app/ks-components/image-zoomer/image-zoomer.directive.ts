import {Directive, OnInit, ElementRef, Renderer2} from '@angular/core';
import {MatDialog} from '@angular/material';
import {ExpandedImageModalComponent} from './expanded-image-modal/expanded-image-modal.component';

@Directive({
  selector: '[app-image-zoomer]',
})
export class ImageZoomerDirective implements OnInit {
  private MAX_WIDTH: any = 400;
  private MAX_HEIGHT: any = 500;
  private MIN_SIZE_TO_ZOOM: any = 100;
  private zoomableImgElemArr: any = [];

  constructor(private element: ElementRef, private renderer: Renderer2, public dialog: MatDialog) {
  }

  ngOnInit() {
    const images = this.element.nativeElement.querySelectorAll('img');
    let clickableIconElement;
    let clickableImageElement;

    images.forEach((imgElement) => {
      clickableIconElement = this.addIconToImage(imgElement);
      clickableImageElement = imgElement;
      this.addImageHandler(clickableIconElement, imgElement);  // clickable icon
      this.addImageHandler(clickableImageElement, imgElement); // clickable image
    });
  }


  public addImageHandler(clickableElement, image) {
    if (this._shouldImageBeZoomed(image)) {
      return;
    }

    // if (this._getImageWidth(image) > 400) {
    //     image.style.width = this.MAX_WIDTH + 'px';
    //     image.style.height = 'auto';
    // }
    image.className = 'img-to-zoom';
    this.renderer.listen(clickableElement, 'click', () => {
      // todo - remove listener
      this.zoomImage(image);
    });
    // angular.element(imgElement).on('click', function () {
    //   zoomImage(image);
    // });
    this.zoomableImgElemArr.push(clickableElement);
  }

  private DialogController($scope) {
    // $scope.closeDialog = function () {
    //   $mdDialog.hide();
    // };
  }

  private zoomImage(img) {
    const dialogRef = this.dialog.open(ExpandedImageModalComponent
      , {
        panelClass: 'expanded-image-modal',
        width: (img.style.width || img.clientWidth + 100) * 2 + 'px',
        height: (img.style.height || img.clientHeight + 100) * 2 + 'px',
        data: {img}
      });

    // var parentEl = angular.element($document.body);
    // $mdDialog.show({
    //   clickOutsideToClose: true,
    //   parent: parentEl,
    //   template: '<div class="zoom-image-modal">' +
    //   '<svg-icon ng-click="closeDialog()" name="image-zoomer-close-popup"></svg-icon>' +
    //   '<md-dialog ng-click="closeDialog()">' +
    //   '<md-dialog-content>' +
    //   '<img src="' + image.src + '" style="width:' + image.width * 2 + 'px; ' + 'height:' + image.height * 2 + 'px">' +
    //   '</md-dialog-content>' +
    //   '</md-dialog>' +
    //   '</div>',
    //   controller: DialogController
    // });

  }

  private addIconToImage(image) {
    if (this._shouldImageBeZoomed(image)) {
      return image;
    }

    // if (this._getImageWidth(image) > this.MAX_WIDTH) {
    //   image.style.width = this.MAX_WIDTH + 'px';
    //   image.style.height = 'auto';
    // }

    const imageParent = image.parentNode;
    // const imageNewParent = `<div class="zoomable-image-with-icon">x</div>`;   // wrap img and icon with one div element
    const imageNewParent = this.renderer.createElement('div');   // wrap img and icon with one div element

    this.renderer.setStyle(imageNewParent, 'position', 'relative');
    this.renderer.setStyle(imageNewParent, 'border', '1px dotted rgba(0, 0, 0, 0.4)');
    this.renderer.setStyle(imageNewParent, 'padding', '5px');
    this.renderer.setStyle(imageNewParent, 'width', image.style.width || image.clientWidth + 'px');
    this.renderer.setStyle(imageNewParent, 'height', image.style.height || image.clientHeight + 'px');

    imageParent.append(imageNewParent);
    imageParent.replaceChild(imageNewParent, image);
    imageNewParent.append(image);

    const iconWrapper = this.renderer.createElement('div');   // wrap img and icon with one div element

    const iconWrapperStyle = this.renderer.createElement('style');   // wrap img and icon with one div element
    iconWrapperStyle.innerHTML = '.zoom-icon-wrapper svg:hover{opacity:0.5;}';

    this.renderer.addClass(iconWrapper, 'zoom-icon-wrapper');
    iconWrapper.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="40px" height="40px" viewBox="0 0 16 16"><path fill="#00d8f0" d="M5.3 6.7l1.4-1.4-3-3 1.3-1.3h-4v4l1.3-1.3z"/><path fill="#00d8f0" d="M6.7 10.7l-1.4-1.4-3 3-1.3-1.3v4h4l-1.3-1.3z"/><path fill="#00d8f0" d="M10.7 9.3l-1.4 1.4 3 3-1.3 1.3h4v-4l-1.3 1.3z"/><path fill="#00d8f0" d="M11 1l1.3 1.3-3 3 1.4 1.4 3-3 1.3 1.3v-4z"/></svg>`;
    this.renderer.setAttribute(iconWrapper, 'style', 'cursor: pointer; background-color: $bgColor57; position: absolute;bottom: 0; right: 0; width:40px; height:40px;');

    iconWrapper.append(iconWrapperStyle);
    imageNewParent.append(iconWrapper);

    return iconWrapper;
  }

  private _shouldImageBeZoomed(image) {
    const imgWidth = this._getImageWidth(image);
    const imgHeight = image.style.height || image.style.clientHeight;

    return imgWidth === null || imgWidth < this.MIN_SIZE_TO_ZOOM || this._getImageHeight(imgHeight, imgWidth) < this.MIN_SIZE_TO_ZOOM || this._getImageHeight(imgHeight, imgWidth) > this.MAX_HEIGHT;
  }

  private _getImageWidth(image) {
    return image.style.width || image.style.clientWidth; // todo - if it's style.width remove 'px'

  }

  private _getImageHeight(imgHeight, imgWidth) {
    return imgWidth > this.MAX_WIDTH ? (imgHeight * this.MAX_WIDTH) / imgWidth : imgHeight;
  }
}

// scope.$on('$destroy', function () {
// for (var i = 0; i < zoomableImgElemArr.length; i++) {
//   angular.element(zoomableImgElemArr[i]).off('click');
// }

import {Directive, OnInit, ElementRef, Renderer2} from '@angular/core';

@Directive({
  selector: '[app-image-zoomer]',
})
export class ImageZoomerDirective implements OnInit {
  private MAX_WIDTH: any = 400;
  private MAX_HEIGHT: any = 500;
  private MIN_SIZE_TO_ZOOM: any = 100;
  private zoomableImgElemArr: any = [];

  constructor(private element: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit() {
    let images = this.element.nativeElement.querySelectorAll('img', '.post-body');
    let clickableIconElement;
    let clickableImageElement;

    images.forEach((imgElement) => {
      clickableIconElement = this.addIconToImage(imgElement);
      clickableImageElement = imgElement;
      this.addImageHandler(clickableIconElement, imgElement);  // clickable icon
      this.addImageHandler(clickableImageElement, imgElement); // clickable image
    });
  }


  public addImageHandler(imgElement, image) {
    if (this._shouldImageBeZoomed(image)) {
      return;
    }
    // if (this._getImageWidth(image) > 400) {
    //     image.style.width = this.MAX_WIDTH + 'px';
    //     image.style.height = 'auto';
    // }
    image.className = 'img-to-zoom';
    // angular.element(imgElement).on('click', function () {
    //   zoomImage(image);
    // });
    this.zoomableImgElemArr.push(imgElement);
  }

  private DialogController($scope) {
    // $scope.closeDialog = function () {
    //   $mdDialog.hide();
    // };
  }

  private zoomImage(image) {
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
    this.renderer.setStyle(imageNewParent, 'margin', '0 auto');
    this.renderer.setStyle(imageNewParent, 'textAlign', 'center');
    this.renderer.setStyle(imageNewParent, 'width', image.style.width);
    this.renderer.setStyle(imageNewParent, 'height', image.style.height);

    imageParent.append(imageNewParent);
    imageParent.replaceChild(imageNewParent, image);
    imageNewParent.append(image);

    const iconWrapper = this.renderer.createElement('div');   // wrap img and icon with one div element
    this.renderer.addClass(iconWrapper, 'zoom-icon-wrapper');
    iconWrapper.innerHTML = '<svg enable-background="new 0 0 34 34" height="34px" id="Layer_1" version="1.1" viewBox="0 0 34 34" width="34px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><polygon fill="#231F20" points="22.658,14.619 24.868,12.409 27.078,10.199 29.288,7.989 29.385,7.893 32.905,11.413 33.212,1.303    23.101,1.61 26.622,5.13 26.525,5.227 24.315,7.437 22.105,9.646 19.896,11.856 19.563,12.19 22.324,14.952  "/><polygon fill="#231F20" points="12.596,9.646 10.386,7.437 8.176,5.227 8.08,5.13 11.6,1.61 1.489,1.303 1.796,11.413 5.317,7.893    5.414,7.989 7.623,10.199 9.833,12.409 12.042,14.619 12.377,14.952 15.139,12.19 14.806,11.856  "/><polygon fill="#231F20" points="29.385,26.436 29.288,26.34 27.078,24.13 24.868,21.92 22.658,19.709 22.324,19.376 19.563,22.139    19.896,22.472 22.105,24.682 24.315,26.892 26.525,29.102 26.622,29.198 23.101,32.719 33.212,33.025 32.905,22.916  "/><polygon fill="#231F20" points="12.042,19.709 9.833,21.92 7.623,24.13 5.414,26.34 5.317,26.437 1.796,22.916 1.489,33.025    11.6,32.719 8.079,29.198 8.176,29.102 10.386,26.892 12.596,24.682 14.806,22.472 15.139,22.139 12.377,19.376  "/></g></svg';

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

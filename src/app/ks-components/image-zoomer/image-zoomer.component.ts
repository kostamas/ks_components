import { Directive, OnInit } from '@angular/core';

@Directive({
  selector: '[imageZoomer]'
})
export class ImageZoomerDirective implements OnInit {
  private MAX_WIDTH: any = 400;
  private MAX_HEIGHT: any = 500;
  private MIN_SIZE_TO_ZOOM: any = 100;
  private zoomableImgElemArr: any = [];

  constructor() {
  }

  ngOnInit() {
    // var imageElements = element[0].querySelectorAll('img');

    // angular.forEach(imageElements, function (imgElement) {
    //   var clickableIconElement = addIconToImage(imgElement);
    //   var clickableImageElement = imgElement;
    //   this.addImageHandler(clickableIconElement, imgElement);  // clickable icon
    //   this.addImageHandler(clickableImageElement, imgElement); // clickable image
    // });
  }


  public addImageHandler(imgElement, image) {
    if (this._shouldImageBeZoomed(image)) {
      return;
    }
    if (this._getImageWidth(image) > 400) {
      image.style.width = this.MAX_WIDTH + 'px';
      image.style.height = 'auto';
    }
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

    if (this._getImageWidth(image) > this.MAX_WIDTH) {
      image.style.width = this.MAX_WIDTH + 'px';
      image.style.height = 'auto';
    }
    // var imageParent = angular.element(image.parentNode);
    // var imageNewParent = angular.element('<div class="zoomable-image-with-icon"></div>');   // wrap img and icon with one div element
    // imageNewParent.css('position', 'relative');
    // imageNewParent.css('margin', '0 auto');
    // imageNewParent.css('textAlign', 'center');
    // imageNewParent.css('width', image.style.width);
    // imageNewParent.css('height', image.style.height);
    // imageParent.append(imageNewParent);
    // imageParent[0].replaceChild(imageNewParent[0], image);
    // imageNewParent.append(image);

    // var svgIconTemplate = '<div class="zoom-icon-wrapper">' +
    //   '<svg-icon name="image-zoomer-full-screen-icon"></svg-icon>' +
    //   '</div>';
    //
    // imageNewParent.append(svgIconTemplate);
    // var iconElement = imageNewParent[0].querySelector('.zoom-icon-wrapper');
    // $compile(iconElement)(scope);
    // return iconElement;
  }

  private _shouldImageBeZoomed(image) {
    return image.style.width === null || this._getImageWidth(image) < this.MIN_SIZE_TO_ZOOM || this._getImageHeight(image) < this.MIN_SIZE_TO_ZOOM || this._getImageHeight(image) > this.MAX_HEIGHT;
  }

  private _getImageWidth(image) {
    return +image.style.width.replace('px', '');
  }

  private _getImageHeight(image) {
    var width = this._getImageWidth(image);
    var height = +image.style.height.replace('px', '');
    return width > this.MAX_WIDTH ? (height * this.MAX_WIDTH) / width : height;
  }
}
  // scope.$on('$destroy', function () {
  // for (var i = 0; i < zoomableImgElemArr.length; i++) {
  //   angular.element(zoomableImgElemArr[i]).off('click');
  // }
  // zoomableImgElemArr = [];
// });
// }

// (function (angular) {
//   'use strict';
//
//   angular.module('znk.infra-web-app.imageZoomer').directive('imageZoomer', function($timeout, $mdDialog, $document, $compile) {
//     'ngInject';
//
//     function compileFn() {
//       function preFn(scope, element) {
//       }
//
//       return {
//         post: preFn
//       };
//     }
//
//     var directive = {
//       priority: -1000,
//       restrict: 'A',
//       scope: {},
//       compile: compileFn
//     };
//
//     return directive;
//   });
//
// })(angular);

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var expanded_image_modal_component_1 = require("./expanded-image-modal/expanded-image-modal.component");
var ImageExpanderDirective = (function () {
    function ImageExpanderDirective(element, renderer, dialog) {
        this.element = element;
        this.renderer = renderer;
        this.dialog = dialog;
        this.listeners = [];
        this.expand = true;
        this.MIN_IMG_SIZE = 100;
        this.MAX_IMG_SIZE = 600;
    }
    ImageExpanderDirective.prototype.ngOnChanges = function (changes) {
        if (changes && changes.expand && changes.expand.currentValue && this.listeners.length === 0) {
            this.triggerImageExpander();
        }
    };
    ImageExpanderDirective.prototype.ngAfterViewInit = function () {
        if (this.expand && this.listeners.length === 0) {
            this.triggerImageExpander();
        }
    };
    ImageExpanderDirective.prototype.triggerImageExpander = function () {
        var _this = this;
        var images = this.element.nativeElement.querySelectorAll('img');
        images.forEach(function (imageElement) {
            if (!imageElement.complete) {
                var listenerFn_1 = _this.renderer.listen(imageElement, 'load', function (loadEvent) {
                    var loadedImage = loadEvent.target;
                    _this.expandImageHandler(loadedImage);
                    listenerFn_1();
                });
            }
            else {
                _this.expandImageHandler(imageElement);
            }
        });
    };
    ImageExpanderDirective.prototype.expandImageHandler = function (loadedImage) {
        if (this.shouldExpandImage(loadedImage)) {
            var iconElement = this.addIconToImage(loadedImage);
            this.addClickHandler(iconElement, loadedImage); // clickable icon
            this.addClickHandler(loadedImage, loadedImage); // clickable image
        }
    };
    ImageExpanderDirective.prototype.addClickHandler = function (clickableElement, image) {
        var _this = this;
        this.listeners.push(this.renderer.listen(clickableElement, 'click', function () { return _this.expandImage(image); }));
    };
    ImageExpanderDirective.prototype.expandImage = function (img) {
        this.dialog.open(expanded_image_modal_component_1.ExpandedImageModalComponent, {
            panelClass: 'expanded-image-modal',
            data: { img: img }
        });
    };
    ImageExpanderDirective.prototype.addIconToImage = function (image) {
        var imageDimensions = this.getImageDimensions(image);
        var imageNewParent = this.renderer.createElement('div'); // wrap img and icon with one div element
        var imageParent = image.parentNode;
        this.renderer.setStyle(imageNewParent, 'position', 'relative');
        this.renderer.setStyle(imageNewParent, 'border', '1px dotted rgba(0, 0, 0, 0.4)');
        this.renderer.setStyle(imageNewParent, 'padding', '5px');
        this.renderer.setStyle(imageNewParent, 'width', imageDimensions.width + "px");
        this.renderer.setStyle(imageNewParent, 'height', image.style.height + "px");
        imageParent.append(imageNewParent);
        imageParent.replaceChild(imageNewParent, image);
        imageNewParent.append(image);
        var iconWrapper = this.renderer.createElement('div'); // wrap img and icon with one div element
        var iconWrapperStyle = this.renderer.createElement('style'); // wrap img and icon with one div element
        iconWrapperStyle.innerHTML = '.expand-icon-wrapper svg:hover{opacity:0.5;}';
        this.renderer.addClass(iconWrapper, 'expand-icon-wrapper');
        iconWrapper.innerHTML = "<svg  width=\"40px\" height=\"40px\" viewBox=\"0 0 16 16\">\n                              <path fill=\"#00d8f0\" d=\"M5.3 6.7l1.4-1.4-3-3 1.3-1.3h-4v4l1.3-1.3z\"/>\n                              <path fill=\"#00d8f0\" d=\"M6.7 10.7l-1.4-1.4-3 3-1.3-1.3v4h4l-1.3-1.3z\"/>\n                              <path fill=\"#00d8f0\" d=\"M10.7 9.3l-1.4 1.4 3 3-1.3 1.3h4v-4l-1.3 1.3z\"/>\n                              <path fill=\"#00d8f0\" d=\"M11 1l1.3 1.3-3 3 1.4 1.4 3-3 1.3 1.3v-4z\"/>\n                            </svg>";
        this.renderer.setAttribute(iconWrapper, 'style', 'cursor: pointer; position: absolute; bottom: 0; right: 0; width:40px; height:40px;');
        iconWrapper.append(iconWrapperStyle);
        imageNewParent.append(iconWrapper);
        return iconWrapper;
    };
    ImageExpanderDirective.prototype.shouldExpandImage = function (image) {
        var imageDimensions = this.getImageDimensions(image);
        return !(imageDimensions.height === null || imageDimensions.width === null ||
            imageDimensions.height < this.MIN_IMG_SIZE || imageDimensions.width < this.MIN_IMG_SIZE ||
            imageDimensions.height > this.MAX_IMG_SIZE || imageDimensions.width > this.MAX_IMG_SIZE);
    };
    ImageExpanderDirective.prototype.getImageDimensions = function (image) {
        return { width: image.clientWidth, height: image.clientHeight };
    };
    ImageExpanderDirective.prototype.ngOnDestroy = function () {
        this.listeners.forEach(function (removeListenerFn) { return removeListenerFn(); });
    };
    __decorate([
        core_1.Input()
    ], ImageExpanderDirective.prototype, "expand", void 0);
    __decorate([
        core_1.Input()
    ], ImageExpanderDirective.prototype, "MIN_IMG_SIZE", void 0);
    __decorate([
        core_1.Input()
    ], ImageExpanderDirective.prototype, "MAX_IMG_SIZE", void 0);
    ImageExpanderDirective = __decorate([
        core_1.Directive({
            selector: '[appImageExpander]',
        })
    ], ImageExpanderDirective);
    return ImageExpanderDirective;
}());
exports.ImageExpanderDirective = ImageExpanderDirective;

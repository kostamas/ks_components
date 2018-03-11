"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var GalleryComponent = (function () {
    function GalleryComponent(changeDetector) {
        var _this = this;
        this.changeDetector = changeDetector;
        this.directions = {
            LEFT: -1,
            RIGHT: 1
        };
        this.currentExpandedImage = 1;
        this.expandedImageSize = 0;
        this.isFramesLocked = false;
        this.leftShiftAmount = 0;
        this.selectedIndex = 0;
        this.sliderStyle = { left: '0px' };
        this.expandedImages = [{ style: { left: 0 } }, { style: { left: 0 } }, { style: { left: 0 } }];
        this.LEFT_KEY_CODE = 39;
        this.RIGHT_KEY_CODE = 39;
        this.imagesPaths = [];
        this.keyPressHandler = function (event) {
            if (_this.isFramesLocked) {
                return;
            }
            setTimeout(function () { return _this.isFramesLocked = false; }, 100);
            _this.isFramesLocked = true;
            if (event.keyCode === 37) {
                _this.expandedImageClickHandler(_this.directions.LEFT);
            }
            if (event.keyCode === 39) {
                _this.expandedImageClickHandler(_this.directions.RIGHT);
            }
        };
        this.expandedImageClickHandler = function (direction) {
            var nextIndex = _this.selectedIndex + direction;
            if (_this.imagesPaths.length < 2) {
                return;
            }
            if (nextIndex < 0) {
                var lastIndex = _this.imagesPaths.length - 1;
                _this.selectedIndex = lastIndex;
                _this.sliderStyle = { left: -(lastIndex) * _this.leftShiftAmount + "px" };
            }
            else if (nextIndex >= _this.imagesPaths.length) {
                _this.selectedIndex = 0;
                _this.sliderStyle = { left: "0px" };
            }
            else {
                _this.selectedIndex = _this.selectedIndex + direction;
                var currentOffset = +_this.sliderStyle.left.replace('px', '');
                _this.sliderStyle = { left: currentOffset - direction * _this.leftShiftAmount + "px" };
            }
            _this.updateExpandedImages(direction);
        };
        this.updateExpandedImages = function (direction) {
            var nextImg, previousImg, imgIndexSrc;
            _this.currentExpandedImage = (_this.currentExpandedImage + direction) % 3;
            _this.currentExpandedImage = _this.currentExpandedImage < 0 ? 2 : _this.currentExpandedImage;
            _this.setExpandedImgData(_this.currentExpandedImage, 0, null, '0.4s ease-out');
            nextImg = (_this.currentExpandedImage + 1) % 3;
            nextImg = nextImg > 2 ? 0 : nextImg;
            previousImg = (_this.currentExpandedImage - 1) < 0 ? 2 : _this.currentExpandedImage - 1;
            if (direction === _this.directions.LEFT) {
                imgIndexSrc = (_this.selectedIndex - 1) < 0 ? _this.imagesPaths.length - 1 : _this.selectedIndex - 1;
                _this.setExpandedImgData(nextImg, _this.expandedImageSize + 20, null, '0.4s ease-out');
                _this.setExpandedImgData(previousImg, -1 * (_this.expandedImageSize + 20), _this.imagesPaths[imgIndexSrc], 'none');
            }
            else {
                imgIndexSrc = (_this.selectedIndex + 1) >= _this.imagesPaths.length ? 0 : _this.selectedIndex + 1;
                _this.setExpandedImgData(nextImg, _this.expandedImageSize + 20, _this.imagesPaths[imgIndexSrc], 'none');
                _this.setExpandedImgData(previousImg, -1 * (_this.expandedImageSize + 20), null, '0.4s ease-out');
            }
        };
    }
    GalleryComponent.prototype.ngAfterViewInit = function () {
        var imgArrLength = this.imagesPaths.length;
        this.initLeftShiftAmount();
        this.setExpandedImgData('0', -1 * (this.expandedImageSize + 20), this.imagesPaths[imgArrLength - 1]);
        this.setExpandedImgData('1', 0, this.imagesPaths[0]);
        this.setExpandedImgData('2', this.expandedImageSize + 20, this.imagesPaths[1]);
        this.changeDetector.detectChanges();
    };
    GalleryComponent.prototype.initLeftShiftAmount = function () {
        var imgArrLength = this.imagesPaths.length;
        var sliderWidth = this.slider.nativeElement.clientWidth;
        this.expandedImageSize = this.galleryContainer.nativeElement.clientWidth;
        if (sliderWidth > this.galleryContainer.nativeElement.clientWidth) {
            this.leftShiftAmount = ((sliderWidth - this.galleryContainer.nativeElement.clientWidth) / (imgArrLength - 1));
        }
        else {
            this.leftShiftAmount = 0; //there is no images overflow.
        }
    };
    GalleryComponent.prototype.imgClickHandler = function (index) {
        this.selectedIndex = index;
        var nextIndex, previousIndex;
        this.currentExpandedImage = 1;
        nextIndex = (index + 1) >= this.imagesPaths.length ? 0 : (index + 1);
        previousIndex = (index - 1) < 0 ? this.imagesPaths.length - 1 : (index - 1);
        this.setExpandedImgData('0', -1 * (this.expandedImageSize + 20), this.imagesPaths[previousIndex]);
        this.setExpandedImgData('1', 0, this.imagesPaths[index]);
        this.setExpandedImgData('2', 1 * this.expandedImageSize + 20, this.imagesPaths[nextIndex]);
        this.sliderStyle = { left: -1 * index * this.leftShiftAmount + "px" };
    };
    GalleryComponent.prototype.setExpandedImgData = function (index, leftStyle, src, transition) {
        this.expandedImages[index].width = this.expandedImageSize + "px";
        this.expandedImages[index].style = { left: leftStyle + "px", transition: transition };
        if (src) {
            this.expandedImages[index].src = src;
        }
    };
    __decorate([
        core_1.Input()
    ], GalleryComponent.prototype, "imagesPaths", void 0);
    __decorate([
        core_1.ViewChild('slider')
    ], GalleryComponent.prototype, "slider", void 0);
    __decorate([
        core_1.ViewChild('galleryContainer')
    ], GalleryComponent.prototype, "galleryContainer", void 0);
    __decorate([
        core_1.HostListener('document:keydown', ['$event'])
    ], GalleryComponent.prototype, "keyPressHandler", void 0);
    GalleryComponent = __decorate([
        core_1.Component({
            selector: 'app-gallery',
            templateUrl: './gallery.component.html',
            styleUrls: ['./gallery.component.scss']
        })
    ], GalleryComponent);
    return GalleryComponent;
}());
exports.GalleryComponent = GalleryComponent;

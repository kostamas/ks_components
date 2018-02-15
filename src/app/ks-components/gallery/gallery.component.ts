import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  constructor() {
  }

  private sliderRef = null;

  public directions = {
    LEFT: -1,
    RIGHT: 1
  };

  public currentExpandedImage = 1;
  public expandedImageSize = 0;
  public isFramesLocked = false;
  public leftShiftAmount = 0;
  public selectedIndex = 0;
  public sliderStyle = {left: '0px'};
  public expandedImages: [{ left: 0 }, { left: 0 }, { left: 0 }];
  public galleryContainerRef;
  @Input() imagesPaths = [];

  ngOnInit() {
    const imgArrLength = this.imagesPaths.length;
    this.initLeftShiftAmount();
    this.setExpandedImgData('0', -1 * (this.expandedImageSize + 20), this.imagesPaths[imgArrLength - 1]);
    this.setExpandedImgData('1', 0, this.imagesPaths[0]);
    this.setExpandedImgData('2', 1 * this.expandedImageSize + 20, this.imagesPaths[1]);
  }

  initLeftShiftAmount() {
    const imgArrLength = this.imagesPaths.length;
    const sliderWidth = this.sliderRef.clientWidth;
    this.expandedImageSize = this.galleryContainerRef.clientWidth;

    if (sliderWidth > this.galleryContainerRef.clientWidth) {
      this.leftShiftAmount = ((sliderWidth - this.galleryContainerRef.clientWidth) / (imgArrLength - 1 ) );
    } else {
      this.leftShiftAmount = 0; //there is no images overflow.
    }
  }

  imgClickHandler(index) {
    this.selectedIndex = index;
    let nextIndex, previousIndex;
    this.currentExpandedImage = 1;
    nextIndex = (index + 1) >= imagesPaths.length ? 0 : (index + 1);
    previousIndex = (index - 1) < 0 ? imagesPaths.length - 1 : (index - 1);

    this.setExpandedImgData('0', -1 * (this.expandedImageSize + 20), imagesPaths[previousIndex]);
    this.setExpandedImgData('1', 0, imagesPaths[index]);
    this.setExpandedImgData('2', 1 * this.expandedImageSize + 20, imagesPaths[nextIndex]);

    this.sliderStyle = {left: `${-1 * index * this.leftShiftAmount}px`};
  }

  keyPressHandler(event) {
    if (this.isFramesLocked) {
      return;
    }
    setTimeout(() => this.isFramesLocked = false, 150);

    this.isFramesLocked = true;
    if (event.keyCode === 37) { // left
      this.expandedImageClickHandler(this.directions.LEFT);
    }
    if (event.keyCode === 39) { // right
      this.expandedImageClickHandler(this.directions.RIGHT);
    }
  }

  expandedImageClickHandler(direction) {
    const nextIndex = this.selectedIndex + direction;
    if (this.imagesPaths.length < 2) {
      return;
    }

    if (nextIndex < 0) {
      const lastIndex = this.imagesPaths.length - 1;
      this.selectedIndex = lastIndex;
      this.sliderStyle = {left: `${-(lastIndex) * this.leftShiftAmount}px`};
    } else if (nextIndex >= this.imagesPaths.length) {
      this.selectedIndex = 0;
      this.sliderStyle = {left: `0px`};
    } else {
      this.selectedIndex = this.selectedIndex + direction;
      const currentOffset = +this.sliderStyle.left.replace('px', '');
      this.sliderStyle = {left: `${currentOffset - direction * this.leftShiftAmount}px`};
    }

    this.updateExpandedImages(direction);
  }

  updateExpandedImages(direction) {
    let nextImg, previousImg, imgIndexSrc;

    this.currentExpandedImage = (this.currentExpandedImage + direction) % 3;
    this.currentExpandedImage = this.currentExpandedImage < 0 ? 2 : this.currentExpandedImage;
    this.setExpandedImgData(this.currentExpandedImage, 0);

    nextImg = (this.currentExpandedImage + 1) % 3;
    nextImg = nextImg > 2 ? 0 : nextImg;
    previousImg = (this.currentExpandedImage - 1) < 0 ? 2 : this.currentExpandedImage - 1;
    if (direction === this.directions.LEFT) {
      imgIndexSrc = (this.selectedIndex - 1) < 0 ? imagesPaths.length - 1 : this.state.selectedIndex - 1;
      this.setExpandedImgData(nextImg, this.expandedImageSize + 20);
      this.setExpandedImgData(previousImg, -1 * (this.expandedImageSize + 20), imagesPaths[imgIndexSrc], 'none');
    } else {
      imgIndexSrc = (this.state.selectedIndex + 1) >= imagesPaths.length ? 0 : this.state.selectedIndex + 1;
      this.setExpandedImgData(nextImg, this.expandedImageSize + 20, imagesPaths[imgIndexSrc], 'none');
      this.setExpandedImgData(previousImg, -1 * (this.expandedImageSize + 20));
    }
  }

  setExpandedImgData(index, leftStyle, src?, transition?) {
    this.expandedImages[index].style = {width: `${this.expandedImageSize}px`, left: `${leftStyle}px`};
    if (src) {
      this.expandedImages[index].src = src;
    }
    if (transition) {
      this.expandedImages[index].style.transition = transition;
    }
  }

}

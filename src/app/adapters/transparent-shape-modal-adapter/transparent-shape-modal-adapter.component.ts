import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {TransparentShapeModalService} from '../../ks-components/transparent-shape-modal/services/transparent-shape-modal.service';

@Component({
  selector: 'app-transparent-shape-modal-adapter',
  templateUrl: './transparent-shape-modal-adapter.component.html',
  styleUrls: ['./transparent-shape-modal-adapter.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TransparentShapeModalAdapterComponent implements OnInit, OnDestroy {
  private interval;
  private timeout;
  public isModalOpen = false;
  public radius = 150;

  private noop = () => {};

  constructor(private transparentShapeModalService: TransparentShapeModalService) {
  }

  ngOnInit() {
  }

  public openTransShapeModalByPos($event) {
    if (!this.isModalOpen) {
      const position = {left: $event.clientX, top: $event.clientY};
      this.transparentShapeModalService.openTransparentShapeModal(position, this.radius, null, this.closeModal);
      this.isModalOpen = true;
    }
  }

  public openTransShapeModal() {
    if (!this.isModalOpen) {
      const position = {left: 700, top: 300};
      this.transparentShapeModalService.openTransparentShapeModal(position, this.radius, null, this.closeModal);
      this.isModalOpen = true;
    }
  }

  public runModalInCircles() {
    if (this.isModalOpen) {
      return;
    }

    let x, y, circleRadius = 150, degree = 0;
    this.isModalOpen = true;


    this.interval = setInterval(() => {
      x = circleRadius * Math.cos((degree * Math.PI) / 180) + 600;
      y = circleRadius * Math.sin((degree * Math.PI) / 180) + 300;

      this.transparentShapeModalService.openTransparentShapeModal({left: x, top: y}, this.radius, this.noop, this.noop);
      this.timeout = setTimeout(this.transparentShapeModalService.closeModal, 80);
      degree += 20;
      degree = degree % 360;
    }, 160);
  }

  public closeModal = () => {
    if (this.interval || this.interval === 0) {
      clearInterval(this.interval);
    }

    if (this.timeout || this.timeout === 0) {
      clearTimeout(this.timeout);
    }

    this.transparentShapeModalService.closeModal();
    this.isModalOpen = false;
  };


  ngOnDestroy() {
    if (this.isModalOpen) {
      this.closeModal();
    }
  }
}

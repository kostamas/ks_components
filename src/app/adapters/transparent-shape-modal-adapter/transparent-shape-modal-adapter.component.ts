import {Component, Inject, OnDestroy, OnInit, Renderer2, ViewEncapsulation} from '@angular/core';
import {
  ITransparentShapeModalConfig,
  TransparentShapeModalService
} from '../../ks-components/transparent-shape-modal/services/transparent-shape-modal.service';
import {DOCUMENT} from '@angular/common';
import {Observable} from 'rxjs/Rx';


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

  private noop = () => {
  };

  constructor(private transparentShapeModalService: TransparentShapeModalService,
              @Inject(DOCUMENT) private document: Document) {
  }

  ngOnInit() {
  }

  public openTransShapeModalByPos($event) {
    if (!this.isModalOpen) {
      const position = {left: $event.clientX, top: $event.clientY};
      this.transparentShapeModalService.openTransparentShapeModal(position, this.radius, {backgroundClickHandler: this.closeModal});
      this.isModalOpen = true;
    }
  }

  public openTransShapeModal() {
    if (!this.isModalOpen) {
      const position = {left: 700, top: 300};
      this.transparentShapeModalService.openTransparentShapeModal(position, this.radius, {backgroundClickHandler: this.closeModal});
      this.isModalOpen = true;
    }
  }

  public runModalInCircles() {
    if (this.isModalOpen) {
      return;
    }

    let x, y, degree = 0;
    const circleRadius = 150;
    this.isModalOpen = true;


    this.interval = setInterval(() => {
      x = circleRadius * Math.cos((degree * Math.PI) / 180) + 600;
      y = circleRadius * Math.sin((degree * Math.PI) / 180) + 300;

      const config: ITransparentShapeModalConfig = {backgroundClickHandler: this.noop, circleClickHandler: this.noop};
      this.transparentShapeModalService.openTransparentShapeModal({left: x, top: y}, this.radius, config);

      this.timeout = setTimeout(this.transparentShapeModalService.closeModal, 80);
      degree += 20;
      degree = degree % 360;
    }, 150);
  }

  public playOnDrag() {
    this.isModalOpen = true;

    Observable.fromEvent(this.document.body, 'click')
      .skip(1)
      .switchMap(({clientX, clientY}) => {
        this.transparentShapeModalService.openTransparentShapeModal({left: clientX, top: clientY}, this.radius, {});
        return Observable.fromEvent(this.document.body, 'mousemove');
      })
      .subscribe(({clientX, clientY}) => {
        this.closeModal();
        this.transparentShapeModalService.openTransparentShapeModal({left: clientX, top: clientY}, this.radius, {});
      });
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

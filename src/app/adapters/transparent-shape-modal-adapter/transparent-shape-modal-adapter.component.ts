import {Component, Inject, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {
  ITransparentShapeModalConfig,
  TransparentShapeModalService
} from '../../ks-components/transparent-shape-modal/transparent-shape-modal.service';
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
  public radius = 150;
  public VIEW_STATES={
    MODAL_CLOSED:1,
    MODAL_OPENED:2,
    MODAL_AND_STOP_BTN_OPENED:3
  };
  public currentViewState = this.VIEW_STATES.MODAL_CLOSED;
  public selectedButton = '';

  private noop = () => {
  };

  constructor(private transparentShapeModalService: TransparentShapeModalService,
              @Inject(DOCUMENT) private document: Document) {
  }

  ngOnInit() {
  }

  public openTransShapeModalByPos($event) {
    if (this.currentViewState === this.VIEW_STATES.MODAL_CLOSED) {
      const position = {left: $event.clientX, top: $event.clientY};
      this.transparentShapeModalService.openTransparentShapeModal(position, this.radius, {backgroundClickHandler: this.closeModal});
      this.currentViewState = this.VIEW_STATES.MODAL_AND_STOP_BTN_OPENED;
    }
  }

  public openTransShapeModal() {
    if (this.currentViewState === this.VIEW_STATES.MODAL_CLOSED) {
      const position = {left: 700, top: 300};
      this.transparentShapeModalService.openTransparentShapeModal(position, this.radius, {backgroundClickHandler: this.closeModal});
      this.currentViewState = this.VIEW_STATES.MODAL_AND_STOP_BTN_OPENED;
    }
  }

  public runModalInCircles() {
    if (this.currentViewState !== this.VIEW_STATES.MODAL_CLOSED) {
      return;
    }

    let x, y, degree = 0;
    const circleRadius = 150;
    this.currentViewState = this.VIEW_STATES.MODAL_AND_STOP_BTN_OPENED;


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

  public playOnMouseEMove() {
    if (this.currentViewState !== this.VIEW_STATES.MODAL_CLOSED) {
      return;
    }

    this.currentViewState = this.VIEW_STATES.MODAL_OPENED;
    this.selectedButton = 'on-mouse-move-selected';

    Observable.fromEvent(this.document.body, 'click')
      .skip(1)
      .switchMap(({clientX, clientY}) => {
        this.transparentShapeModalService.openTransparentShapeModal({left: clientX, top: clientY}, this.radius, {});
        return Observable.fromEvent(this.document.body, 'mousemove');
      })
      .takeUntil(Observable.fromEvent(this.document.body, 'click').skip(2))
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
    this.currentViewState = this.VIEW_STATES.MODAL_CLOSED;
    this.selectedButton = '';
  };

  ngOnDestroy() {
    if (this.currentViewState !== this.VIEW_STATES.MODAL_CLOSED) {
      this.closeModal();
    }
  }
}

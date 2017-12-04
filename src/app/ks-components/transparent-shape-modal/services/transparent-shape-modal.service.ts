import {ApplicationRef, ComponentFactoryResolver, EmbeddedViewRef, Inject, Injectable, Injector} from '@angular/core';
import {TransparentShapeModalComponent} from "../transparent-shape-modal.component";


@Injectable()
export class TransparentShapeModalService {
  public componentRef;
  public static noop = () => {
  };

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private appRef: ApplicationRef,
              private injector: Injector) {
  }

  public openTransparentShapeModal(position, radius, circleClickHandler?, backgroundClickHandler?) {
    position.left -= radius / 2;
    position.top -= radius / 2;

    // good article by Carlos Roso - Angular Pro Tip: How to dynamically create components in <body>
    // https://medium.com/@caroso1222/angular-pro-tip-how-to-dynamically-create-components-in-body-ba200cc289e6

     this.componentRef = this.componentFactoryResolver
      .resolveComponentFactory(TransparentShapeModalComponent)
      .create(this.injector);

    this.componentRef.instance.position = position;
    this.componentRef.instance.circleRadius = radius;
    this.componentRef.instance.transparentShapeClickHandler = circleClickHandler || TransparentShapeModalService.noop;
    this.componentRef.instance.backgroundClickHandler = backgroundClickHandler || this.closeModal;

    this.appRef.attachView(this.componentRef.hostView);

    const domElem = (this.componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;

    document.body.appendChild(domElem);

  }

  public closeModal = ()=> {
    this.appRef.detachView(this.componentRef.hostView);
    this.componentRef.destroy();
  }
}

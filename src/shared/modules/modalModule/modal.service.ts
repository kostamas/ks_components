import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  Injectable,
  Injector
} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private componentRef: ComponentRef<any>;
  private modalContainer: any;
  private modalOverlay: any;
  private closeModalButton: any;
  private isOpen = false;

  public componentWrapper: any;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private appRef: ApplicationRef,
              private injector: Injector) {
  }

  open(component: any, modalConfig?: IModalConfig, data?: any): any {
    if (!this.isModalOpen()) {
      return this.appendComponentToBody(component, modalConfig, data);
    }
  }

  appendComponentToBody(component: any, modalConfig?: IModalConfig, data?: any): any {
    modalConfig = !!modalConfig ? modalConfig : {};

    // 1. Create a component reference from the component
    this.componentRef = this.componentFactoryResolver
      .resolveComponentFactory(component)
      .create(this.injector);

    // 2. Attach component to the appRef so that it's inside the ng component tree
    this.appRef.attachView(this.componentRef.hostView);

    // 3. Get DOM element from component
    const domElem = (this.componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;

    if (!this.modalContainer) {
      this.modalContainer = document.createElement('div');
    }

    this.modalContainer.className = '';
    this.modalContainer.classList.add('modal-container');

    if (modalConfig.modalClass) {
      const classNamesArr: string[] = Array.isArray(modalConfig.modalClass) ? modalConfig.modalClass : [modalConfig.modalClass];
      classNamesArr.forEach(className => this.modalContainer.classList.add(className));
    }

    this.modalOverlay = this.buildElement('modal-overlay', this.modalContainer);
    this.componentWrapper = this.buildElement('component-wrapper', this.modalContainer);

    if (!modalConfig.hidCloseButton) {
      this.closeModalButton = this.buildElement(['icon-cancel', 'close-modal'], this.componentWrapper);
      this.closeModalButton.addEventListener('click', this.closeModal);
    }

    if (!modalConfig.disableClose) {
      this.modalOverlay.addEventListener('click', this.closeModal);
    }

    // 4. Append modal container element to the body
    document.body.appendChild(this.modalContainer);

    this.updateComponentData(data);

    this.componentRef.instance.closeModal = this.closeModal;
    this.componentRef.changeDetectorRef.detectChanges();

    // 5. Append component Dom element to modal container ;
    this.componentWrapper.appendChild(domElem);

    this.isOpen = true;

    return this.closeModal;
  }

  buildElement(className: string | string[], parent: any): any {
    const elementRef = document.createElement('div');
    const classNamesArr = Array.isArray(className) ? className : [className];
    classNamesArr.forEach(_className => elementRef.classList.add(_className));
    parent.appendChild(elementRef);
    return elementRef;
  }

  isModalOpen(): boolean {
    return this.isOpen;
  }

  updateComponentData(data){
    this.componentRef.instance.data = data;
  }

  closeModal = () => {
    this.modalContainer.classList.add('animate-closing');
    this.isOpen = false;

    setTimeout(() => {
      this.appRef.detachView(this.componentRef.hostView);
      this.componentRef.destroy();
      this.modalContainer.removeChild(this.modalOverlay);
      this.modalContainer.removeChild(this.componentWrapper);
      this.modalContainer.classList.remove('animate-closing');
      this.modalContainer.classList.add('closed');
      this.modalContainer.classList.add('closed');
      this.modalOverlay.removeEventListener('click', this.closeModal);
      this.closeModalButton && this.closeModalButton.removeEventListener('click', this.closeModal);
      this.modalOverlay.classList.add('closed');
      this.componentWrapper = null;
    }, 250);
  };
}

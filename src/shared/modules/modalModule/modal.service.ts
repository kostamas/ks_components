import {
  ApplicationRef,
  ComponentFactoryResolver,
  EmbeddedViewRef,
  Injectable,
  Injector
} from '@angular/core';
import {generateId} from '../../utils/jsUtils';
import {IModal, IModalConfig} from '../../types/modal';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  public modals: IModal[] = [];

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private appRef: ApplicationRef,
              private injector: Injector) {
  }

  open(component: any, modalConfig?: IModalConfig, data?: any): any {
    return this.appendComponentToBody(component, modalConfig, data);
  }

  appendComponentToBody(component: any, modalConfig?: IModalConfig, data?: any): any {
    const id = generateId();
    const modal: any = {id};

    modalConfig = !!modalConfig ? modalConfig : {};

    // 1. Create a component reference from the component
    modal.componentRef = this.componentFactoryResolver
      .resolveComponentFactory(component)
      .create(this.injector);

    // 2. Attach component to the appRef so that it's inside the ng component tree
    this.appRef.attachView(modal.componentRef.hostView);

    // 3. Get DOM element from component
    const domElem = (modal.componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;


    modal.modalContainer = document.createElement('div');

    modal.modalContainer.classList.add('modal-container');


    this.modalConfigHandler(modalConfig, modal);

    // 4. Append modal container element to the body
    document.body.appendChild(modal.modalContainer);

    if (data) {
      data.modal = modal;
    }

    modal.componentRef.instance.data = data;
    modal.componentRef.instance.closeModal = this.closeModal.bind(this, modal);
    modal.componentRef.changeDetectorRef.detectChanges();

    // 5. Append component Dom element to modal container;
    modal.componentWrapper.appendChild(domElem);

    modal.closeModal = this.closeModal.bind(this, modal);
    modal.updateComponentData = this.updateComponentData.bind(this, modal);
    modal.updateStyle = this.updateStyle.bind(this, modal);
    this.modals.push(modal);
    return modal;
  }

  private modalConfigHandler(modalConfig: IModalConfig, modal: any): void {

    if (modalConfig.closeModalCallback !== undefined) {
      modal.closeModalCallback = modalConfig.closeModalCallback;
    }

    if (modalConfig.modalClass) {
      const classNamesArr: string[] = Array.isArray(modalConfig.modalClass) ? modalConfig.modalClass : [modalConfig.modalClass];
      classNamesArr.forEach(className => modal.modalContainer.classList.add(className));
    }

    modal.modalOverlay = this.buildElement('modal-overlay', modal.modalContainer);
    modal.componentWrapper = this.buildElement('component-wrapper', modal.modalContainer);

    if (modalConfig.style) {
      this.updateStyle(modal, modalConfig.style);
    }

    if (!modalConfig.disableClose) {
      modal.modalOverlay.addEventListener('click', this.closeModal.bind(this, modal));
    }

    if (modalConfig.position) {
      const {x, y} = modalConfig.position;
      modal.componentWrapper.style.left = x + 'px';
      modal.componentWrapper.style.top = y + 'px';
    }
  }

  private buildElement(className: string | string[], parent: any): any {
    const elementRef = document.createElement('div');
    const classNamesArr = Array.isArray(className) ? className : [className];
    classNamesArr.forEach(_className => elementRef.classList.add(_className));
    parent.appendChild(elementRef);
    return elementRef;
  }

  updateComponentData(modal: IModal, data: any): void {
    modal.componentRef.instance.data = data;
  }

  updateStyle(modal: IModal, style: any): void {
    Object.keys(style).forEach(styleKey => {
      modal.componentWrapper.style[styleKey] = style[styleKey];
    });
  }

  isModalOpen(modalId: string): boolean {
    return this.modals.filter(modal => modal.id === modalId).length > 0;
  }

  closeModal = (modal: IModal, skipAnimation?: boolean) => {
    const timeOut = skipAnimation ? 0 : 250;

    if (!skipAnimation) {
      modal.modalContainer.classList.add('animate-closing');
    }

    setTimeout(() => {
      this.appRef.detachView(modal.componentRef.hostView);
      modal.componentRef.destroy();
      modal.modalContainer.removeChild(modal.modalOverlay);
      modal.modalContainer.removeChild(modal.componentWrapper);
      modal.modalContainer.classList.remove('animate-closing');
      modal.modalContainer.classList.add('closed');
      modal.modalContainer.classList.add('closed');
      modal.modalOverlay.removeEventListener('click', () => this.closeModal(modal));
      modal.modalOverlay.classList.add('closed');
      document.body.removeChild(modal.modalContainer);

      if (modal.closeModalCallback !== undefined) {
        modal.closeModalCallback();
      }

      let index = -1;
      for (let i = 0; i < this.modals.length; i++) {
        index = this.modals[i].id === modal.id ? i : 0;
      }

      if (index > -1) {
        this.modals.slice(index, 1);
      }
    }, timeOut);
  }
}

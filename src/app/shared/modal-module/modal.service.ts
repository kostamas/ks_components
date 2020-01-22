import {ApplicationRef, ComponentFactoryResolver, EmbeddedViewRef, Injectable, Injector} from '@angular/core';
import {JsUtils} from '../../utils/jsUtils';
import {IModal, IModalConfig} from '../../types/modal';

@Injectable({
	providedIn: 'root'
})
export class ModalService {
	public modals: IModal[] = [];
	private componentsOutputs: any[] = [];

	constructor(private componentFactoryResolver: ComponentFactoryResolver, private appRef: ApplicationRef,
							private injector: Injector) {
	}

	open(component: any, modalConfig?: IModalConfig, data?: any, inputs?: any, outputs?: any): any {
		return this.appendComponentToBody(component, modalConfig, data, inputs, outputs);
	}

	appendComponentToBody(component: any, modalConfig?: IModalConfig, data?: any, inputs?: any, outputs?: any): any {
		const id = JsUtils.generateId();
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
			modal.componentRef.instance.data = data;
		}

		if (inputs) {
			Object.keys(inputs).forEach((inputName: string) => {
				modal.componentRef.instance[inputName] = inputs[inputName];
			});
		}

		if (outputs) {
			Object.keys(outputs).forEach((outputName: string) => {
				modal.componentRef.instance[outputName].subscribe(outputs[outputName]);
			});
		}

		modal.componentRef.instance.closeModal = this.closeModal.bind(this, modal);
		modal.componentRef.changeDetectorRef.detectChanges();

		// 5. Append component Dom element to modal container;
		modal.componentWrapper.appendChild(domElem);

		modal.closeModal = this.closeModal.bind(this, modal);
		modal.updateComponentData = this.updateComponentData.bind(this, modal);
		modal.updateStyle = this.updateStyle.bind(this, modal);
		modal.isOpen = true;
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

		modal.closeModalEventListener = this.closeModal.bind(this, modal);
		if (!modalConfig.disableClose) {
			modal.modalOverlay.addEventListener('click', modal.closeModalEventListener);
		}

		if (modalConfig.showCloseButton) {
			modal.closeButtonRef = this.addCloseButton(modal.componentWrapper);
			modal.closeButtonRef.addEventListener('click', modal.closeModalEventListener);
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

	private addCloseButton(parent: any): HTMLElement {
		const elementRef: HTMLElement = document.createElement('div');
		const closeIcon = `<svg id="round-close" width="20" height="20" viewBox="0 0 20 20"><style>#round-close .cls-2 {fill: #818181}</style><path id="Delete" class="cls-2" d="M10.355,0.012A9.988,9.988,0,1,0,20.344,10,9.987,9.987,0,0,0,10.355.012ZM14.649,12.7l-1.59,1.588a36.688,36.688,0,0,0-2.7-2.7,37.178,37.178,0,0,0-2.7,2.7L6.061,12.7a31.146,31.146,0,0,0,2.7-2.7,30.751,30.751,0,0,0-2.7-2.7L7.652,5.707s2.538,2.7,2.7,2.7,2.7-2.7,2.7-2.7L14.649,7.3a36.616,36.616,0,0,0-2.7,2.7C11.946,10.183,14.649,12.7,14.649,12.7Z"></path></svg>`;
		elementRef.innerHTML = closeIcon;
		elementRef.style.position = 'absolute';
		elementRef.style.cursor = 'pointer';
		elementRef.style.right = '13px';
		elementRef.style.zIndex = '5';
		elementRef.style.top = '13px';
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

	closeModal = (modal: IModal) => {
		if (!modal.isOpen) {
			return;
		} else {
			modal.isOpen = false;
		}

		setTimeout(() => {
			this.appRef.detachView(modal.componentRef.hostView);
			modal.componentRef.destroy();
			modal.modalContainer.removeChild(modal.modalOverlay);
			modal.modalContainer.removeChild(modal.componentWrapper);
			modal.modalContainer.classList.add('closed');
			modal.modalContainer.classList.add('closed');
			modal.modalOverlay.removeEventListener('click', modal.closeModalEventListener);
			if (modal.closeButtonRef) {
				modal.closeButtonRef.removeEventListener('click', modal.closeModalEventListener);
			}
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

			this.componentsOutputs.forEach(subscription => subscription.unsubscribe());
		});
	}
}

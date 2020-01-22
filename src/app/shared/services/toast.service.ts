import {
	ApplicationRef, ComponentFactoryResolver, EmbeddedViewRef, Injectable, Injector
} from '@angular/core';
import {IToastConfig} from '../types/toast';
import {ToastComponent} from '../modules/toast-module/toast/toast.component';
import {JsUtils} from '../utils/jsUtils';

@Injectable({
	providedIn: 'root'
})
export class ToastService {
	public componentRefs: any = {};

	constructor(private componentFactoryResolver: ComponentFactoryResolver,
							private appRef: ApplicationRef, private injector: Injector) {
	}

	showToastMessage(config: IToastConfig): any {
		const toastId = JsUtils.generateId();
		const componentRef = this.componentFactoryResolver
			.resolveComponentFactory(ToastComponent)
			.create(this.injector);

		this.componentRefs[toastId] = {component: componentRef};
		this.componentRefs[toastId].id = toastId;
		componentRef.instance.config = config;
		componentRef.instance.closeToast = this.closeToast.bind(this, toastId);
		this.appRef.attachView(componentRef.hostView);
		const toastComponent = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
		componentRef.changeDetectorRef.detectChanges();
		document.body.appendChild(toastComponent);
		if (!config.disableAutoClose) {
			this.componentRefs[toastId].timeout = setTimeout(this.closeToast.bind(this, toastId), 5000);
		}
		return this.componentRefs[toastId];
	}

	closeToast = (toastId: string) => {
		if (this.componentRefs[toastId].timeout) {
			clearTimeout(this.componentRefs[toastId].timeout);
		}
		this.componentRefs[toastId].component.destroy();
		delete this.componentRefs[toastId];
	}
}

import {
	AfterViewInit, ApplicationRef, ComponentFactoryResolver, Directive, ElementRef, EmbeddedViewRef,
	HostListener, Injector, Input, NgZone, OnDestroy, OnInit
} from '@angular/core';
import {Subject} from 'rxjs';

@Directive({selector: '[app-tooltip]'})
export class TooltipDirective implements OnDestroy, AfterViewInit, OnInit {
	@Input('tooltipTitle') tooltipTitle: string = '';
	@Input('tooltipComponent') tooltipComponent: any;
	@Input('direction') direction: 'top' | 'right' | 'bottom' | 'left';
	@Input('tooltipComponentInputs') tooltipComponentInputs: any[];
	@Input('tooltipComponentOutputs') tooltipComponentOutputs: any[];
	@Input('isOpen$') isOpen$: Subject<boolean>;
	@Input('isToolTipDisabled') isToolTipDisabled: boolean;
	@Input('tooltipClass') tooltipClass: any[];

	public isOpen: boolean = false;
	public tooltipDomElement: HTMLElement;
	public triangleDomElement: HTMLElement;
	public subscriptionsArray: any[] = [];
	public cancelClosingTooltip: boolean = false;

	constructor(private hostElement: ElementRef, private componentFactoryResolver: ComponentFactoryResolver,
							private appRef: ApplicationRef, private injector: Injector, private zone: NgZone) {
	}

	ngOnInit(): void {
		if (this.isOpen$) {
			this.subscriptionsArray.push(this.isOpen$.subscribe(isOpen => {
				if (isOpen) {
					this.openTooltip();
				} else {
					if (this.isOpen) {
						this.closeTooltip();
					}
				}
				this.isOpen = isOpen;
			}));
		}
	}

	ngAfterViewInit(): void {
		if (!this.isOpen$) {
			this.zone.runOutsideAngular(() => {
				document.body.addEventListener('mouseover', this.closeOnMouseLeaveHandler);
			});
		}
	}

	@HostListener('mouseenter')
	onMouseEnter(): void {
		if (!this.isOpen$ && !this.isToolTipDisabled) {
			if (this.isOpen) {
				return;
			}
			this.isOpen = true;
			this.openTooltip();
		}
	}

	openTooltip(): void {
		this.tooltipDomElement = document.createElement('div');
		if (this.tooltipClass) {
			this.tooltipDomElement.className += (this.tooltipClass + ' tooltip');
		}

		if (this.tooltipComponent) {
			const componentRef = this.compileTooltipComponent();
			this.appRef.attachView(componentRef.hostView);
			const tooltipComponent = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
			this.tooltipDomElement.appendChild(tooltipComponent);
		} else {
			this.tooltipDomElement.innerHTML = this.tooltipTitle;
		}
		this.triangleDomElement = document.createElement('div');
		this.triangleDomElement.className += 'triangle-tooltip';
		this.tooltipDomElement.appendChild(this.triangleDomElement);
		this.setTooltipStyle(this.tooltipDomElement);
		setTimeout(this.calcTooltipPosition.bind(this, this.direction));
		document.body.appendChild(this.tooltipDomElement);
	}

	closeOnMouseLeaveHandler = (event: any) => {
		const {isOpen, tooltipDomElement, hostElement} = this;
		if (isOpen) {
			if (hostElement.nativeElement.contains(event.target) || (tooltipDomElement && tooltipDomElement.contains(event.target))) {
				this.cancelClosingTooltip = true;
			} else {
				this.cancelClosingTooltip = false;
				setTimeout(() => !this.cancelClosingTooltip && this.closeTooltip(), 100);
			}
		}
	}

	compileTooltipComponent(): any {
		const componentRef = this.componentFactoryResolver
			.resolveComponentFactory(this.tooltipComponent)
			.create(this.injector);
		if (this.tooltipComponentInputs) {
			Object.keys(this.tooltipComponentInputs)
				.forEach(input => componentRef.instance[input] = this.tooltipComponentInputs[input]);
		}
		if (this.tooltipComponentOutputs) {
			Object.keys(this.tooltipComponentOutputs)
				.forEach(output => this.subscriptionsArray
					.push(componentRef.instance[output].subscribe(this.tooltipComponentOutputs[output])));
		}
		return componentRef;
	}

	setTriangleStyle(direction: 'top' | 'right' | 'bottom' | 'left'): void {
		const triangleDomElement = this.triangleDomElement;
		triangleDomElement.style['position'] = 'absolute';
		switch (direction) {
			case 'top':
				triangleDomElement.style['left'] = 'calc(50% - 10px)';
				triangleDomElement.style['bottom'] = '-8px';
				triangleDomElement.style['border-left'] = '10px solid transparent';
				triangleDomElement.style['border-right'] = '10px solid transparent';
				triangleDomElement.style['border-top'] = '10px solid #22303e';
				break;
			case 'right':
				triangleDomElement.style['left'] = '-10px';
				triangleDomElement.style['top'] = 'calc(50% - 10px)';
				triangleDomElement.style['border-top'] = '10px solid transparent';
				triangleDomElement.style['border-bottom'] = '10px solid transparent';
				triangleDomElement.style['border-right'] = '10px solid #22303e';
				break;
			case 'bottom':
				triangleDomElement.style['left'] = 'calc(50% - 10px)';
				triangleDomElement.style['top'] = '-10px';
				triangleDomElement.style['border-left'] = '10px solid transparent';
				triangleDomElement.style['border-right'] = '10px solid transparent';
				triangleDomElement.style['border-bottom'] = '10px solid #22303e';
				break;
			case 'left':
				triangleDomElement.style['right'] = '-10px';
				triangleDomElement.style['top'] = 'calc(50% - 10px)';
				triangleDomElement.style['border-top'] = '10px solid transparent';
				triangleDomElement.style['border-bottom'] = '10px solid transparent';
				triangleDomElement.style['border-left'] = '10px solid #22303e';
				break;
			default:
				break;
		}
		triangleDomElement.style['z-index'] = '13';
	}

	setTooltipStyle(tooltipDomElement: HTMLElement): void {
		tooltipDomElement.style['background-color'] = '#22303e';
		tooltipDomElement.style['padding'] = '16px';
		tooltipDomElement.style['border-radius'] = '5px';
		tooltipDomElement.style['position'] = 'absolute';
		tooltipDomElement.style['z-index'] = '1301';
		tooltipDomElement.style['top'] = '0';
		tooltipDomElement.style['left'] = '0';
		tooltipDomElement.style['color'] = 'white';
		tooltipDomElement.style['visibility'] = 'hidden';
	}


	calcTooltipPosition(direction?: string): void {
		const hostBoundingClientRect = this.hostElement.nativeElement.getBoundingClientRect();
		const tooltipClientRect = this.tooltipDomElement.getBoundingClientRect();
		const hostX = (hostBoundingClientRect.x || hostBoundingClientRect.left);
		const hostY = (hostBoundingClientRect.y || hostBoundingClientRect.top);
		const hostWidth = hostBoundingClientRect.width;
		const hostHeight = hostBoundingClientRect.height;
		let left, top;

		switch (direction) {
			case 'top':
				left = (hostX - ((tooltipClientRect.width - hostWidth) / 2));
				top = hostY - tooltipClientRect.height - 10;
				break;
			case 'right':
				left = hostX - 35;
				top = (hostY - ((tooltipClientRect.height - hostHeight) / 2));
				break;
			case 'bottom':
				left = (hostX - ((tooltipClientRect.width - hostWidth) / 2));
				top = hostY + hostWidth + 15;
				break;
			case 'left':
				left = hostX - tooltipClientRect.width - 15;
				top = (hostY - ((tooltipClientRect.height - hostHeight) / 2));
				break;
			default:
				this.calculatedDefaultTooltipPosition(hostBoundingClientRect, tooltipClientRect);
				return;
		}
		this.setTriangleStyle(direction);
		this.tooltipDomElement.style['top'] = top + 'px';
		this.tooltipDomElement.style['left'] = left + 'px';
		this.tooltipDomElement.style['visibility'] = 'visible';
	}

	calculatedDefaultTooltipPosition(hostBoundingClientRect: any, tooltipClientRect: any): void {
		const hostY = (hostBoundingClientRect.y || hostBoundingClientRect.top);
		if (hostY - tooltipClientRect.height < 30) {
			this.calcTooltipPosition('bottom');
		} else {
			this.calcTooltipPosition('top');
		}
	}

	closeTooltip = () => {
		if (this.isOpen) {
			this.isOpen = false;
			document.body.removeChild(this.tooltipDomElement);
		}
		this.tooltipDomElement = null;
	}

	ngOnDestroy(): void {
		this.isOpen = false;
		this.subscriptionsArray.forEach(subscription => subscription.unsubscribe());
		if (this.tooltipDomElement) {
			document.body.removeChild(this.tooltipDomElement);
		}

		document.body.removeEventListener('mouseover', this.closeOnMouseLeaveHandler);
	}
}

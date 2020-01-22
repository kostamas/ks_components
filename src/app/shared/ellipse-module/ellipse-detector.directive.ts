import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
	selector: '[appEllipseDetector]'
})
export class EllipseDetectorDirective {

	element: ElementRef;
	copiedElement: HTMLElement;

	@Input('fontSize') fontSize: number;
	@Input('paddingLeft') paddingLeft: number;
	@Input('paddingRight') paddingRight: number;

	constructor(private el: ElementRef) {
		this.element = el;
	}

	private createElementCopy(): void {
		const newElement: HTMLElement = document.createElement('span');
		newElement.innerText = this.element.nativeElement.value ? this.element.nativeElement.value : this.element.nativeElement.innerHTML;

		let fontSize = this.fontSize || this.element.nativeElement.style.fontSize.replace('px', '');
		if (!fontSize) {
			const style = window.getComputedStyle(this.element.nativeElement, null).getPropertyValue('font-size');
			fontSize = parseFloat(style);
		}

		let paddingLeft = this.paddingLeft || this.element.nativeElement.style.paddingLeft.replace('px', '');
		if (!paddingLeft) {
			const style = window.getComputedStyle(this.element.nativeElement, null).getPropertyValue('padding-left');
			paddingLeft = parseFloat(style);
		}

		let paddingRight = this.paddingRight || this.element.nativeElement.style.paddingRight.replace('px', '');
		if (!paddingRight) {
			const style = window.getComputedStyle(this.element.nativeElement, null).getPropertyValue('padding-right');
			paddingRight = parseFloat(style);
		}

		newElement.style.paddingLeft = paddingLeft + 'px';
		newElement.style.paddingRight = paddingRight + 'px';
		newElement.style.fontSize = fontSize + 'px';
		newElement.style.position = 'absolute';
		this.copiedElement = newElement;
		document.body.appendChild(this.copiedElement);
	}

	private destroyElementCopy(): void {
		document.body.removeChild(this.copiedElement);
		this.copiedElement = undefined;
	}

	@HostListener('mouseenter') onMouseEnter(): void {
		this.createElementCopy();
		if (this.element.nativeElement.offsetWidth < this.copiedElement.offsetWidth) {
			this.element.nativeElement.title = this.element.nativeElement.value ? this.element.nativeElement.value : this.element.nativeElement.innerText;
		}
		this.destroyElementCopy();
	}

	@HostListener('mouseleave') onMouseLeave(): void {
		this.element.nativeElement.title = '';
	}


}

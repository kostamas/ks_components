import {
	Component, ComponentFactoryResolver, ElementRef, EventEmitter, HostListener, Injector, Input, NgZone, OnChanges,
	OnDestroy, OnInit, Output, SimpleChanges, ViewChild, ViewContainerRef, ViewEncapsulation
} from '@angular/core';
import {ModalService} from '../../../modal-module/modal.service';
import {IModal, IModalConfig} from '../../../../types/modal';
import {ISelectInputValidationStatus, ISelectItem} from '../../../../types/ISelect';
import {ISvgIcons, SVG_ICONS} from '../../../svg-icon-module/svg-icons.const';
import {SelectRegularOptionsComponent} from '../options/select-regular-options/select-regular-options.component';
import {Subject} from 'rxjs';

@Component({
	selector: 'app-select-input',
	templateUrl: './select-input.component.html',
	styleUrls: ['./select-input.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class SelectInputComponent implements OnInit, OnChanges, OnDestroy {
	public modalConfig: IModalConfig;
	public modal: IModal;
	public isOptionsOpened: boolean = false;
	public optionsComponentRef: any = false;
	public SVG_ICONS: ISvgIcons = SVG_ICONS;
	public unsubscribeArr: any[] = [];
	public validationStatus: any = {message: '', isValid: true};

	@Input() validationStatus$: Subject<ISelectInputValidationStatus>;
	@Input() optionsComponent: any;
	@Input() inputTextHandler: (p: any, list: any[]) => any;
	@Input() setTextManually$: Subject<string>;
	@Input() openOptionsInModal: boolean = false;
	@Input() selectList: any[];
	@Input() optionsClass: string | string[];
	@Input() componentInputs: any = {};
	@Input() isSingleSelection: boolean = false;
	@Input() calcOptionsModalPosition: any;
	@Input() isDisabled: boolean = false;

	@Output('onSelectItem') onSelectItem: EventEmitter<ISelectItem> = new EventEmitter();
	@Output('onListChange') onListChange: EventEmitter<ISelectItem[]> = new EventEmitter();

	@ViewChild('optionsContainer', {read: ViewContainerRef}) optionsContainer: ViewContainerRef;
	@ViewChild('optionsWrapperElement') optionsWrapperElement: ElementRef;
	@ViewChild('optionsElement') optionsElement: ElementRef;
	@ViewChild('selectInput') selectInput: ElementRef;
	@ViewChild('title') title: ElementRef;

	constructor(public modalService: ModalService, private zone: NgZone, private injector: Injector,
							private componentFactoryResolver: ComponentFactoryResolver) {
	}

	ngOnInit(): void {
		this.initSelectList(this.selectList);
		this.initText(this.selectList);
		if (this.validationStatus$) {
			this.unsubscribeArr.push(this.validationStatus$.subscribe(validationStatus => this.validationStatus = validationStatus));
		}
		this.zone.runOutsideAngular(() => window.addEventListener('resize', this.resizeHandler.bind(this)));

		if (this.setTextManually$) {
			this.unsubscribeArr.push(this.setTextManually$.subscribe(text => this.setValue(text)));
		}
		if (!this.optionsComponent) {
			this.optionsComponent = SelectRegularOptionsComponent;
		}

		if (this.optionsClass) {
			this.optionsClass = Array.isArray(this.optionsClass) ? this.optionsClass : [this.optionsClass];
		}
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes && changes.selectList && !changes.selectList.firstChange) {
			this.initSelectList(changes.selectList.currentValue);
			this.initText(changes.selectList.currentValue);
		}
	}

	@HostListener('window:resize', ['$event'])
	initializeLeftPane(): void {
		this.resizeHandler();
	}

	@HostListener('document:click', ['$event'])
	clickout(event: any): void {
		const {optionsWrapperElement} = this;
		if (!this.openOptionsInModal && this.isOptionsOpened) {
			if (!optionsWrapperElement.nativeElement.contains(event.target)) {
				this.closeOptions();
			}
		}
	}

	initText(selectList: ISelectItem[]): void {
		let text = '';
		if (this.inputTextHandler) {
			const selectedOption = selectList.filter(option => option.isSelected)[0];
			text = this.inputTextHandler(selectedOption, this.selectList);
		} else {
			this.selectList.forEach(option => option.isSelected ? text = option.name : '');
		}
		this.setValue(text);
	}

	initSelectList(selectList: any): void {
		if (typeof selectList[0] === 'string' || typeof selectList[0] === 'number') {
			const newSelectList = [];
			selectList.forEach(item => newSelectList.push({name: item, value: item, isSelected: false}));
			this.selectList = newSelectList;
			this.selectList[0].isSelected = true;
		}
	}

	resizeHandler(): void {
		if (this.openOptionsInModal && this.modal && this.modalService.isModalOpen(this.modal.id)) {
			this.modal.closeModal(true);
		}
	}

	multipleSelectClickHandler(): void {
		if (this.isOptionsOpened) {
			return;
		}
		setTimeout(() => {  // catch page click first.
			this.isOptionsOpened = true;
			this.openOptions();
		});
	}

	openOptions(): void {
		const data: any = this.buildOptionsData();
		Object.keys(this.componentInputs).forEach(inputKey => data[inputKey] = this.componentInputs[inputKey]);
		data.isSingleSelection = this.isSingleSelection; //todo: find & fix, move to componentInputs.
		if (data.validationStatus$) {
			this.unsubscribeArr.push(data.validationStatus$.subscribe(r => this.validationStatus = r));
		}

		if (this.openOptionsInModal) {
			const {x, y, width, left, top} = this.selectInput.nativeElement.getBoundingClientRect();
			let position = {x: x || left, y: (y || top) + 35};
			if (this.calcOptionsModalPosition) {
				position = this.calcOptionsModalPosition(x || left, y || top);
			}
			this.modalConfig = {
				modalClass: this.optionsClass ? ['select-options-modal', ...<string[]>this.optionsClass] : 'select-options-modal',
				position,
				hidCloseButton: true,
				style: {width: `${width - 2}px`},
				closeModalCallback: () => {
					this.modal = null;
					this.isOptionsOpened = false;
				}
			};
			this.modal = this.modalService.open(this.optionsComponent, this.modalConfig, data);
		} else {
			this.optionsComponentRef = this.componentFactoryResolver
				.resolveComponentFactory(this.optionsComponent)
				.create(this.injector);

			this.optionsComponentRef.instance.data = data;
			this.optionsContainer.insert(this.optionsComponentRef.hostView);
			this.optionsComponentRef.changeDetectorRef.detectChanges();
		}
		setTimeout(this.calcOptionsPosition);
	}

	calcOptionsPosition = () => {
		if (this.openOptionsInModal) {
			this.calcPositionOptionsModal();
		} else {
			this.calcPositionOptionsInternal();
		}
	};

	calcPositionOptionsInternal(): void {
		const optionsWrapperElement = this.optionsWrapperElement.nativeElement;
		const inputClientRect = this.selectInput.nativeElement.getBoundingClientRect();
		const optionsElementClientRec = optionsWrapperElement.getBoundingClientRect();
		const viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
		const inputY = inputClientRect.y || inputClientRect.top;

		if (viewportHeight - (inputY + optionsElementClientRec.height) < 40) {
			if (viewportHeight - inputY > 100 || inputY < 200) {
				optionsWrapperElement.style['overflow-y'] = 'auto';
				if ((viewportHeight - inputY) < 200) {
					optionsWrapperElement.style['max-height'] = `${Math.min(inputY - 60, 230)}px`;
					setTimeout(() => {
						const newOptionsElementClientRec = optionsWrapperElement.getBoundingClientRect();
						optionsWrapperElement.style['top'] = (-newOptionsElementClientRec.height - 1) + 'px';
						optionsWrapperElement.style.opacity = '1';
					});
				} else {
					optionsWrapperElement.style['max-height'] = `${Math.min((viewportHeight - inputY) - 60, 230)}px`;
					optionsWrapperElement.style.opacity = '1';
				}
			} else {
				optionsWrapperElement.style['top'] = (inputY - optionsElementClientRec.height) + 'px';
				optionsWrapperElement.style.opacity = '1';
			}
		} else {
			optionsWrapperElement.style.opacity = '1';
		}
	}

	calcPositionOptionsModal = () => {
		const optionsElement = this.modal.componentWrapper;
		const inputClientRect = this.selectInput.nativeElement.getBoundingClientRect();
		const optionsElementClientRec = optionsElement.getBoundingClientRect();

		const viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
		const inputY = inputClientRect.y || inputClientRect.top;

		if (viewportHeight - (inputY + optionsElementClientRec.height) < 40) {
			if (viewportHeight - inputY > 100 || inputY < 200) {
				optionsElement.style['overflow-y'] = 'auto';
				if ((viewportHeight - inputY) < 200) {
					optionsElement.style['max-height'] = `${Math.min(inputY - 60, 230)}px`;
					setTimeout(() => {
						const newOptionsElementClientRec = optionsElement.getBoundingClientRect();
						optionsElement.style['top'] = (inputY - newOptionsElementClientRec.height) + 'px';
						optionsElement.style.opacity = '1';
						this.modal.modalContainer.style.overflow = 'visible';
					});
				} else {
					optionsElement.style['max-height'] = `${Math.min((viewportHeight - inputY) - 60, 230)}px`;
					optionsElement.style.opacity = '1';
					this.modal.modalContainer.style.overflow = 'visible';
				}
			} else {
				optionsElement.style['top'] = (inputY - optionsElementClientRec.height) + 'px';
				optionsElement.style.opacity = '1';
				this.modal.modalContainer.style.overflow = 'visible';
			}
		} else {
			optionsElement.style.opacity = '1';
			this.modal.modalContainer.style.overflow = 'visible';
		}
	};

	closeOptions(): void {
		this.isOptionsOpened = false;
		this.openOptionsInModal ? this.modal.closeModal(true) : this.destroyOptionsComponent();
	}

	destroyOptionsComponent(): void {
		this.optionsWrapperElement.nativeElement.style.opacity = '0';
		this.optionsWrapperElement.nativeElement.style['max-height'] = '350px';
		this.optionsWrapperElement.nativeElement.style['top'] = '34px';
		this.optionsComponentRef.destroy();
		this.optionsContainer.clear();
	}

	buildOptionsData(): any {
		return {
			selectList: this.selectList,
			onSelectItem: (key, value, closeOnSelect?: boolean) => {
				this.onSelectItem.emit(this.selectList[key]);
				let inputText = this.selectList[key].name;
				if (this.inputTextHandler) {
					inputText = this.inputTextHandler(this.selectList[key], this.selectList);
				}
				this.setValue(inputText);

				if (closeOnSelect) {
					if (this.openOptionsInModal) {
						this.modal.closeModal(true);
					} else {
						this.destroyOptionsComponent();
					}
				}
			},
			onListChange: (selectList: ISelectItem[]) => {
				this.onListChange.emit(selectList);
				this.setValue(this.inputTextHandler(null, selectList));
			},
			setStatus: (status: any) => {
				this.validationStatus = status;
			}
		};
	}

	setValue = (text: any) => {
		this.title.nativeElement.innerHTML = text;
	};

	ngOnDestroy(): void {
		this.unsubscribeArr.forEach(subscription => subscription.unsubscribe());
	}
}

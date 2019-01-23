import {
  Component, ComponentFactoryResolver, ElementRef, EventEmitter, HostListener, Injector, Input,
  NgZone, OnChanges, OnInit, Output, SimpleChanges, ViewChild, ViewContainerRef, ViewEncapsulation
} from '@angular/core';
import {ModalService} from '../../modalModule/modal.service';
import {IModal, IModalConfig} from '../../../types/modal';
import {ISelectItem} from '../../../types/ISelect';
import {ISvgIcons, SVG_ICONS} from '../../svgIconModule/svg-icons.const';
import {SelectRegularOptionsComponent} from '../options/select-regular-options/select-regular-options.component';

@Component({
  selector: 'app-select-input',
  templateUrl: './select-input.component.html',
  styleUrls: ['./select-input.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SelectInputComponent implements OnInit, OnChanges {
  modalConfig: IModalConfig;
  modal: IModal;
  isOptionsOpened: boolean = false;
  optionsComponentRef: any = false;
  SVG_ICONS: ISvgIcons = SVG_ICONS;

  @Input() optionsComponent: any;
  @Input() inputTextHandler: (p: any, list: any[]) => any;
  @Input() openOptionsInModal: boolean = false;
  @Input() selectList: any[];
  @Input() optionsClass: any;

  @Output('multiSelectChanged') multiSelectChanged: EventEmitter<ISelectItem> = new EventEmitter();

  @ViewChild('optionsContainer', {read: ViewContainerRef}) optionsContainer: ViewContainerRef;
  @ViewChild('optionsWrapper') optionsWrapper: ElementRef;
  @ViewChild('selectInput') selectInput: ElementRef;
  @ViewChild('title') title: ElementRef;

  constructor(public modalService: ModalService, private zone: NgZone, private injector: Injector,
              private componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngOnInit(): void {
    this.initSelectList(this.selectList);
    this.initText(this.selectList);
    this.zone.runOutsideAngular(() => window.addEventListener('resize', this.resizeHandler.bind(this)));
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
    const {optionsWrapper} = this;
    if (!this.openOptionsInModal && this.isOptionsOpened) {
      if (!optionsWrapper.nativeElement.contains(event.target)) {
        this.closeOptions();
      }
    }
  }

  initText(selectList: any[]): void {
    let text = '';
    if (this.inputTextHandler) {
      const selectedOption = selectList.filter(option => option.isSelected)[0];
      text = this.inputTextHandler(selectedOption, this.selectList);
    } else {
      this.selectList.forEach(option => option.isSelected ? text = option.text : '');
    }
    this.setText(text);
  }

  initSelectList(selectList: any): void {
    if (typeof selectList[0] === 'string' || typeof selectList[0] === 'number') {
      const newSelectList = [];
      selectList.forEach(item => newSelectList.push({text: item, value: item, isSelected: false}));
      this.selectList = newSelectList;
      this.selectList[0].isSelected = true;
    }
  }

  resizeHandler(): void {
    if (this.openOptionsInModal && this.modal && this.modalService.isModalOpen(this.modal.id)) {
      this.modal.closeModal();
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

    if (this.openOptionsInModal) {
      const {x, y, width, left, top} = this.selectInput.nativeElement.getBoundingClientRect();
      this.modalConfig = {
        modalClass: this.optionsClass ? ['select-options-modal', ...this.optionsClass] : 'select-options-modal',
        position: {x: x || left, y: (y || top) + 35},
        hidCloseButton: true,
        style: {width: `${width - 2}px`},
        closeModalCallback: () => {
          this.modal = null;
          this.isOptionsOpened = false;
        }
      };

      this.modal = this.modalService.open(this.optionsComponent, this.modalConfig, data);

      setTimeout(this.calcOptionsPosition);
    } else {
      this.optionsComponentRef = this.componentFactoryResolver
        .resolveComponentFactory(this.optionsComponent)
        .create(this.injector);
      this.optionsComponentRef.instance.data = data;
      this.optionsContainer.insert(this.optionsComponentRef.hostView);
      this.optionsComponentRef.changeDetectorRef.detectChanges();
    }
  }

  calcOptionsPosition = () => {
    const optionsElement = this.modal.componentWrapper;
    const inputClientRect = this.selectInput.nativeElement.getBoundingClientRect();
    const optionsElementClientRec = optionsElement.getBoundingClientRect();

    const viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    const inputY = inputClientRect.y || inputClientRect.top;

    if (viewportHeight - (inputY + optionsElementClientRec.height) < 20) {
      if (inputY - optionsElementClientRec.height < 100) {
        optionsElement.style['overflow-y'] = 'auto';
        if ((viewportHeight - inputY) < viewportHeight / 2) {
          optionsElement.style['max-height'] = `${Math.min(inputY - 80, 230)}px`;
          setTimeout(() => {
            const newOptionsElementClientRec = optionsElement.getBoundingClientRect();
            optionsElement.style['top'] = (inputY - newOptionsElementClientRec.height) + 'px';
            optionsElement.style.opacity = '1';
            this.modal.modalContainer.style.overflow = 'visible';
          });
        } else {
          optionsElement.style['max-height'] = `${Math.min((viewportHeight - inputY) - 80, 230)}px`;
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
  }

  closeOptions(): void {
    this.isOptionsOpened = false;
    this.openOptionsInModal ? this.modal.closeModal() : this.destroyOptionsComponent();
  }

  destroyOptionsComponent(): void {
    this.optionsComponentRef.destroy();
    this.optionsContainer.clear();
  }

  buildOptionsData(): any {
    return {
      selectList: this.selectList,
      getSelection: (key, value, closeOnSelect?: boolean) => {
        this.selectList[key].isSelected = value;
        let inputText = this.selectList[key].text;
        if (this.inputTextHandler) {
          inputText = this.inputTextHandler(this.selectList[key], this.selectList);
        }
        this.setText(inputText);
        this.multiSelectChanged.emit(this.selectList[key]);

        if (closeOnSelect) {
          if (this.openOptionsInModal) {
            this.closeOptions();
          } else {
            this.destroyOptionsComponent();
          }
        }
      },
    };
  }

  setText = (text: any) => {
    this.title.nativeElement.innerHTML = text;
  }
}

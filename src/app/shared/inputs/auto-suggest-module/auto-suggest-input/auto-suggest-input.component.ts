import {
  AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output, SecurityContext,
  ViewChild, ViewEncapsulation
} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map, switchMap, takeUntil, tap} from 'rxjs/operators';
import {SVG_ICONS} from '../../../svg-icon-module/svg-icons.const';
import {ModalService} from '../../../modal-module/modal.service';
import {AutoSuggestResultsComponent} from '../auto-suggest-results/auto-suggest-results.component';
import {DomSanitizer} from '@angular/platform-browser';
import {ISelectItem} from '../../../types/ISelect';
import {IModal, IModalConfig} from '../../../types/modal';
import {IAutoSuggestValidationStatus} from '../../../types/auto-suggest';
import {SvgIconService} from '../../../services/svg-icons.service';
import {fromEvent} from 'rxjs/observable/fromEvent';

@Component({
  selector: 'app-auto-suggest-input',
  templateUrl: './auto-suggest-input.component.html',
  styleUrls: ['./auto-suggest-input.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AutoSuggestInputComponent implements OnInit, AfterViewInit, OnDestroy {
  public searchTextValue: string = '';
  public displayResults: boolean = false;
  public distinctUntilChanged: boolean = true;
  public selectedValue: any = {name: '', value: '', isSelected: true};
  public unsubscribe$: Subject<boolean> = new Subject();
  public unsubscribeArr: any[] = [];
  public results: ISelectItem[] = [];
  public modal: IModal;
  public isValid: boolean = true;
  public validationStatus: IAutoSuggestValidationStatus = <IAutoSuggestValidationStatus>{};
  public SVG_ICONS: any = SVG_ICONS;
  public modalConfig: IModalConfig;
  public isResultsOpened: boolean = false;
  public autoSuggestData: any;
  public resultsWrapperStyle: any = {};
  public closeButtonWrapperElement: any;

  @Input() maxResultsToDisplay: number = 10;
  @Input() searchCallback: (searchText: string) => Observable<any>;
  @Input() validators: ((x?: any) => any)[];
  @Input() initialValue: any;
  @Input() searchTextValue$: Subject<string>;
  @Input() validationStatus$: Subject<any>;
  @Input() openResultsInModal: boolean = false;
  @Input() dataTransformation: (p: any) => any;
  @Input() isStrictMode: boolean = false;
  @Input() isDisabled: boolean = false;
  @Input() tabIndex: number;
  @Input() isAutoSelectWhenContainsValue: boolean = true;
  @Input() resultsComponent: any;

  @Output('onSelectValue') onSelectValue: EventEmitter<ISelectItem> = new EventEmitter<ISelectItem>();
  @Output('isEmpty') isEmpty: EventEmitter<string> = new EventEmitter<string>();
  @Output('onReset') onReset: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('inputElement') inputElement: ElementRef;
  @ViewChild('resultContainer') resultContainer: ElementRef;

  constructor(private modalService: ModalService, private svgIconService: SvgIconService,
              private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.distinctUntilChanged = true;
    this.displayResults = false;
    this.validationStatus = {isValid: true, message: ''};
    if (this.searchTextValue$) {
      const subscription = this.searchTextValue$.subscribe(searchText => this.searchTextValue = searchText);
      this.unsubscribeArr.push(subscription);
    }

    this.initValidators();
    if (this.initialValue) {
      this.searchTextValue = this.initialValue.name;
    }
    if (this.validationStatus$) {
      const subscription = this.validationStatus$.subscribe(validationStatus => this.validationStatus = validationStatus);
      this.unsubscribeArr.push(subscription);
    }
  }

  initValidators(): void {
    this.validationStatus = {message: '', isValid: true};
    if (this.validators) {
      if (!Array.isArray(this.validators)) {
        this.validators = <((x?: any) => any)[]>[this.validators];
      }
      this.validate(false);
    }
  }

  closeModal = () => {
    if (this.modal && this.modalService.isModalOpen(this.modal.id)) {
      this.modal.closeModal(true);
      this.modal = null;
    }
  };

  closeAutoSuggestResults(): void {
    if (this.openResultsInModal) {
      this.closeModal();
    } else {
      this.resultContainer.nativeElement.style.opacity = '0';
      this.resultContainer.nativeElement.style['max-height'] = '350px';
      this.resultContainer.nativeElement.style['top'] = '35px';
      this.isResultsOpened = false;
    }
    this.autoSuggestData = null;
  }

  closeModalCallback = () => {
    this.modal = null;
  };

  ngAfterViewInit(): void {
    fromEvent(this.inputElement.nativeElement, 'input')
      .pipe(
        takeUntil(this.unsubscribe$),
        debounceTime(500),
        map(() => this.searchTextValue),
        tap(this.inputTapHandler),
        distinctUntilChanged((a, b) => a.trim() === b.trim() && this.distinctUntilChanged),
        filter(() => !!this.searchTextValue),
        switchMap(() => this.searchCallback(this.searchTextValue))
      )
      .subscribe((results: ISelectItem[]) => {
        if (results.length > 0) {
          if (this.isAutoSelectWhenContainsValue) {
            this.checkIfSearchValueInResults(results);
          }
          if (this.dataTransformation) {
            this.dataTransformation(results);
          }
          this.showResults(results);
        } else {
          this.closeAutoSuggestResults();
        }
      });
  }

  inputTapHandler = () => {
    this.resetSuggestState();
    this.validate(true);
    if (!this.searchTextValue) {
      this.closeModal();
      this.isEmpty.next('');
    }
  };

  @HostListener('window:resize', ['$event'])
  initializeLeftPane(): void {
    this.closeModal();
  }

  @HostListener('document:click', ['$event'])
  clickout(event: any): void {
    const {inputElement, resultContainer} = this;
    if (!inputElement.nativeElement.contains(event.target) && !resultContainer.nativeElement.contains(event.target)) {
      this.closeAutoSuggestResults();
      if (this.isStrictMode) {
        this.setValue(this.selectedValue);
      }
    }
  }

  checkIfSearchValueInResults(results: ISelectItem[]): void {
    const searchText = this.searchTextValue.trim().toUpperCase();
    results.forEach((res: ISelectItem) => {
      const resId: string = String(res.id).toUpperCase();
      const resName: string = String(res.name).toUpperCase();
      if (searchText === resName || searchText === resId || searchText === (res.name + ` (${res.id})`)) {
        this.onSelectValue.next(res);
      }
    });
  }

  showResults(originalResults: any[]): void {
    const {x, y, width, height, left, top} = this.inputElement.nativeElement.getBoundingClientRect();
    const results = originalResults.slice(0, this.maxResultsToDisplay);
    const position: any = {x: x || left, y: (y || top) + 35};
    this.autoSuggestData = {
      results,
      inputClientRect: {width, height, x: x || left, y: y || top},
      setValue: this.setValue.bind(this),
      syncScrollBar: this.syncScrollBar.bind(this)
    };

    this.modalConfig = {
      modalClass: 'auto-suggest-results',
      closeModalCallback: this.closeModalCallback,
      position
    };

    if (!this.openResultsInModal) {
      this.isResultsOpened = true;
    } else {
      this.autoSuggestData.closeModal = this.closeModal;
      this.autoSuggestData.onCloseIconClick = this.onCloseIconClick.bind(this);
      this.autoSuggestData.openedInModal = true;
      if (!this.modal || !this.modalService.isModalOpen(this.modal.id)) {
        const resultsComponentToCompile = this.resultsComponent ? this.resultsComponent : AutoSuggestResultsComponent;
        this.modal = this.modalService.open(resultsComponentToCompile, this.modalConfig, this.autoSuggestData);
      } else {
        if (this.modal) {
          this.modal.updateComponentData(this.autoSuggestData);
        }
      }
    }

    setTimeout(this.calcResultsPosition);
  }

  calcResultsPosition = () => {
    if (this.openResultsInModal) {
      this.calcModalResultsPosition();
    } else {
      this.calcPositionResultsInternal();
    }
  };

  calcPositionResultsInternal(): void {
    const optionsWrapperElement = this.resultContainer.nativeElement;
    const inputClientRect = this.inputElement.nativeElement.getBoundingClientRect();
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

  calcModalResultsPosition(): void {
    const viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    const resultsElement: any = this.modal.componentWrapper;
    const resultsClientRect: any = resultsElement.getBoundingClientRect();
    const autoSuggestInputClientRect = this.inputElement.nativeElement.getBoundingClientRect();
    const inputY = autoSuggestInputClientRect.y || autoSuggestInputClientRect.top;
    resultsElement.style['min-width'] = `${autoSuggestInputClientRect.width}px`;

    // important: resultsElement.firstChild - is the compiled component (we need to generate the close icon outside the scrollable container)
    if (viewportHeight - (inputY + resultsClientRect.height) < 40) {
      if (viewportHeight - inputY > 100 || inputY < 200) {
        resultsElement.firstChild.style['overflow-y'] = 'auto';
        resultsElement.firstChild.style['display'] = 'block';
        if ((viewportHeight - inputY) < 200) {
          resultsElement.firstChild.style['max-height'] = `${Math.min(inputY - 60, 230)}px`;
          setTimeout(() => {
            const newOptionsElementClientRec = resultsElement.getBoundingClientRect();
            resultsElement.style['top'] = (inputY - newOptionsElementClientRec.height) + 'px';
            resultsElement.style.overflow = 'visible';
            resultsElement.style['opacity'] = '1';
            this.addCloseButtonToResultsModal(resultsElement, 'bottom', autoSuggestInputClientRect.width);
          });
        } else {
          resultsElement.firstChild.style['max-height'] = `${Math.min((viewportHeight - inputY) - 60, 230)}px`;
          resultsElement.style.overflow = 'visible';
          resultsElement.style['opacity'] = '1';
          this.addCloseButtonToResultsModal(resultsElement, 'top', autoSuggestInputClientRect.width);
        }
      } else {
        resultsElement.style['top'] = (inputY - resultsClientRect.height) + 'px';
        resultsElement.style.overflow = 'visible';
        resultsElement.style['opacity'] = '1';
        this.addCloseButtonToResultsModal(resultsElement, 'bottom', autoSuggestInputClientRect.width);
      }
    } else {
      resultsElement.style.opacity = '1';
      resultsElement.style.overflow = 'visible';
      resultsElement.style['opacity'] = '1';
      this.addCloseButtonToResultsModal(resultsElement, 'top', autoSuggestInputClientRect.width);
    }
  }

  syncScrollBar(selectedIndex: number, results: ISelectItem[], resultHeight: number): void {
    const resultsElement: any = this.openResultsInModal ? this.modal.componentWrapper : this.resultContainer.nativeElement;
    const resultsElementHeight: any = resultsElement.getBoundingClientRect().height;
    const scrollPercentage = (selectedIndex * resultHeight) - resultsElementHeight / 2;
    if (this.openResultsInModal) {
      resultsElement.firstChild.scrollTop = scrollPercentage;
    } else {
      resultsElement.scrollTop = scrollPercentage;
    }
  }

  resetSuggestState(): void {
    this.results = [];
    this.distinctUntilChanged = true;
  }

  onCloseIconClick = () => {
    if (this.closeButtonWrapperElement) {
      this.closeButtonWrapperElement.removeEventListener('click', this.onCloseIconClick);
      this.closeButtonWrapperElement = null;
    }
    this.results = [];
    this.selectedValue = {name: '', value: '', isSelected: true};
    this.searchTextValue = '';
    this.distinctUntilChanged = false;
    this.closeModal();
    this.validate(true);
    this.isEmpty.next('');
  };

  blurHandler(): void {
    if (this.modal) {
      setTimeout(() => this.closeModal(), 200);
    }
  }

  setValue = (selectedItem: any, closeResults?: boolean) => {  // todo - move as an input.
    this.selectedValue = selectedItem;
    this.searchTextValue = `${selectedItem.name} (${selectedItem.id})${selectedItem.countryName ? ` ,${selectedItem.countryName}` : ''}`;
    this.distinctUntilChanged = false;
    this.onSelectValue.next(selectedItem);
    this.validate(true);
    if (closeResults) {
      this.closeAutoSuggestResults();
    }
  };

  showCloseButton = () => {
    return this.searchTextValue.length && (!this.modal || !this.modalService.isModalOpen(this.modal.id));
  };

  validate(isDirty: boolean): void {
    if (this.validators) {
      this.validationStatus = {message: '', isValid: true};
      this.validators.forEach(cb => {
        const validationResult = cb({val: this.searchTextValue, isDirty});
        if (!validationResult.isValid) {
          this.validationStatus = validationResult;
        }
      });
    }
  }

  addCloseButtonToResultsModal(autoSuggestResultsElement: HTMLElement, verticalDirection: string, inputWidth: number): void {
    this.closeButtonWrapperElement = document.createElement('div');
    this.closeButtonWrapperElement.style.left = (inputWidth - 26.5) + 'px';
    this.closeButtonWrapperElement.classList.add('close-auto-suggest-modal-results');
    this.closeButtonWrapperElement.classList.add(verticalDirection);
    const closeBtnSvg: string = this.sanitizer.sanitize(SecurityContext.HTML, this.svgIconService.svgIcons[this.SVG_ICONS.round_close]);
    this.closeButtonWrapperElement.innerHTML = closeBtnSvg;
    autoSuggestResultsElement.appendChild(this.closeButtonWrapperElement);
    this.closeButtonWrapperElement.addEventListener('click', this.onCloseIconClick);
  }

  ngOnDestroy(): void {
    if (this.closeButtonWrapperElement) {
      this.closeButtonWrapperElement.removeEventListener('click', this.onCloseIconClick);
      this.closeButtonWrapperElement = null;
    }
    this.onReset.next('');
    this.unsubscribeArr.forEach(subscription => subscription.unsubscribe());
    this.unsubscribe$.next(true);
    this.closeAutoSuggestResults();
  }
}

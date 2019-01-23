import {
  AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output,
  ViewChild, ViewEncapsulation
} from '@angular/core';
import {SearchResult} from '../mock-results';
import {fromEvent, Observable, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map, switchMap, take, takeUntil, tap} from 'rxjs/operators';
import {SVG_ICONS} from '../../svgIconModule/svg-icons.const';
import {ModalService} from '../../modalModule/modal.service';
import {AutoSuggestResultsComponent} from '../auto-suggest-results/auto-suggest-results.component';
import {IModal, IModalConfig} from '../../../types/modal';

@Component({
  selector: 'app-auto-suggest-input',
  templateUrl: './auto-suggest-input.component.html',
  styleUrls: ['./auto-suggest-input.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AutoSuggestInputComponent implements OnInit, AfterViewInit, OnDestroy {

  searchTextValue: string = '';
  displayResults: boolean = false;
  distinctUntilChanged: boolean = true;
  selectedValue: string;
  unsubscribe$: Subject<boolean> = new Subject();
  unsubscribeArr: any[] = [];
  results: SearchResult[] = [];
  modal: IModal;
  isValid: boolean = true;
  validationStatus: any = {};
  SVG_ICONS: any = SVG_ICONS;
  modalConfig: IModalConfig;
  isResultsOpened: boolean = false;
  autoSuggestData: any;
  resultsWrapperStyle: any = {};

  @Input() maxResultsToDisplay: number = 10;
  @Input() searchCallback: (searchText: string) => Observable<any>;
  @Input() validators: ((x?: any) => any)[];
  @Input() initialValue: any;
  @Input() searchTextValue$: Subject<string>;
  @Input() validationStatus$: Subject<any>;
  @Input() openResultsInModal: boolean = false;
  @Input() dataTransformation: (p: any) => any;

  @Output('onSelectValue') onSelectValue: EventEmitter<string> = new EventEmitter<string>();
  @Output('onReset') onReset: EventEmitter<string> = new EventEmitter<string>(); // todo - find better solution

  @ViewChild('inputElement') inputElement: ElementRef;
  @ViewChild('resultContainer') resultContainer: ElementRef;

  constructor(private modalService: ModalService) {
  }

  ngOnInit(): void {
    this.distinctUntilChanged = true;
    this.displayResults = false;
    this.validationStatus = {isValid: true, message: ''};
    if (this.searchTextValue$) {
      const subscription = this.searchTextValue$.subscribe(searchText => this.searchTextValue = searchText);
      this.unsubscribeArr.push(subscription);
    }
    this.modalConfig = {
      hidCloseButton: true,
      modalClass: 'auto-suggest-results',
      closeModalCallback: this.closeModalCallback
    };
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
        this.validators = [this.validators];
      }
      this.validate(false);
    }
  }

  closeModal = () => {
    if (this.modal && this.modalService.isModalOpen(this.modal.id)) {
      this.modal.closeModal(true);
      this.modal = null;
    }
  }

  closeModalCallback = () => {
    this.modal = null;
  }

  ngAfterViewInit(): void {
    fromEvent(this.inputElement.nativeElement, 'input')
      .pipe(
        takeUntil(this.unsubscribe$),
        debounceTime(500),
        map(() => this.searchTextValue),
        distinctUntilChanged((a, b) => a.trim() === b.trim() && this.distinctUntilChanged),
        tap(this.inputTapHandler),
        filter(() => !!this.searchTextValue),
        switchMap(() => this.searchCallback(this.searchTextValue))
      )
      .subscribe(results => {
        if (results.length > 0) {
          this.checkIfSearchValueInResults(results);
          if (this.dataTransformation) {
            this.dataTransformation(results);
          }
          this.showResults(results);
        } else {
          this.closeModal();
        }
      });
  }

  inputTapHandler = () => {
    this.resetSuggestState();
    this.validate(true);
    if (!this.searchTextValue) {
      this.closeModal();
      this.onReset.next('');
    }
  }

  @HostListener('window:resize', ['$event'])
  initializeLeftPane(): void {
    this.closeModal();
  }

  @HostListener('document:click', ['$event'])
  clickout(event: any): void {
    const {inputElement, resultContainer} = this;
    if (!this.openResultsInModal) {
      if (!inputElement.nativeElement.contains(event.target) && !resultContainer.nativeElement.contains(event.target)) {
        this.isResultsOpened = false;
      }
    }
  }

  checkIfSearchValueInResults(results: any[]): void {
    const searchText = this.searchTextValue.trim();
    results.forEach(res => {
      if (searchText === res.name || searchText === res.id || searchText === (res.name + ` (${res.id})`)) {
        this.onSelectValue.next(res);
      }
    });
  }

  showResults(originalResults: any[]): void {
    const {x, y, width, height, left, top} = this.inputElement.nativeElement.getBoundingClientRect();
    const results = originalResults.slice(0, this.maxResultsToDisplay);
    this.autoSuggestData = {
      results,
      inputClientRect: {width, height, x: x || left, y: y || top},
      updateResultsPosition: this.updateResultsPosition,
      setText: this.setText
    };

    if (!this.openResultsInModal) {
      this.isResultsOpened = true;
    } else {
      this.autoSuggestData.closeModal = this.closeModal;
      this.autoSuggestData.onCloseIconClick = this.onCloseIconClick.bind(this);
      this.autoSuggestData.openedInModal = true;
      if (!this.modal || !this.modalService.isModalOpen(this.modal.id)) {
        this.modal = this.modalService.open(AutoSuggestResultsComponent, this.modalConfig, this.autoSuggestData);
        this.updateResultsPosition(x, y + height);
      } else {
        if (this.modal) {
          this.modal.updateComponentData(this.autoSuggestData);
        }
      }
    }
  }

  updateResultsPosition = (resultsX: number, resultsY: number) => {
    if (this.openResultsInModal) {
      this.modal.updateStyle({left: resultsX + 'px', top: resultsY + 'px'});
    } else {
      setTimeout(() => {
        const {x, y, left, top} = this.inputElement.nativeElement.getBoundingClientRect();
        this.resultsWrapperStyle = {left: `${resultsX - (x || left)}px`, top: `${resultsY - (y || top)}px`};
      });
    }
  }

  resetSuggestState(): void {
    this.results = [];
    this.selectedValue = null;
    this.distinctUntilChanged = true;
  }

  onCloseIconClick(): void {
    this.results = [];
    this.selectedValue = null;
    this.searchTextValue = '';
    this.distinctUntilChanged = false;
    this.closeModal();
    this.validate(true);
    this.onReset.next('');
  }

  setText = (selectedItem: any, closeResults: boolean) => {
    this.searchTextValue = selectedItem.name;
    this.distinctUntilChanged = false;
    this.onSelectValue.next(selectedItem);
    this.validate(true);
    if (closeResults) {
      if (this.openResultsInModal) {
        this.closeModal();
      } else {
        this.isResultsOpened = false;
      }
    }
  }

  showCloseButton = () => {
    return this.searchTextValue.length && (!this.modal || !this.modalService.isModalOpen(this.modal.id));
  }

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

  ngOnDestroy(): void {
    this.onReset.next('');
    this.unsubscribeArr.forEach(subscription => subscription.unsubscribe());
    this.unsubscribe$.next(true);
  }
}

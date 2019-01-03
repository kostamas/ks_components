import {
  AfterViewInit,
  Component,
  ElementRef, EventEmitter,
  HostListener,
  Input, OnDestroy,
  OnInit, Output,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {SearchResult} from '../mock-results';
import {AutoSuggestService} from '../auto-suggest.service';
import {fromEvent, Observable, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, take} from 'rxjs/operators';
import {SVG_ICONS} from '../../svgIconModule/svg-icons.const';
import {ModalService} from '../../modalModule/modal.service';
import {AutoSuggestResultsComponent} from '../auto-suggest-results/auto-suggest-results.component';
import {IModal, IModalConfig} from '../../../types/modal';

@Component({
  selector: 'app-auto-suggest-input',
  templateUrl: './auto-suggest-input.component.html',
  styleUrls: ['./auto-suggest-input.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [AutoSuggestService]
})
export class AutoSuggestInputComponent implements OnInit, AfterViewInit, OnDestroy {

  searchTextValue: string = '';
  displayResults: boolean = false;
  distinctUntilChanged: boolean = true;
  selectedValue: string;
  results: SearchResult[] = [];
  modal: IModal;

  SVG_ICONS: any = SVG_ICONS;

  modalConfig: IModalConfig = {
    hidCloseButton: true,
    modalClass: 'auto-suggest-results',
  }

  @Input() maxResultsToDisplay: number = 10;
  @Input() searchCallback: (searchText) => Observable<any>;
  @Input() searchTextValue$: Subject<string>;

  @Output('onSelectValue') onSelectValue: EventEmitter<string> = new EventEmitter<string>();
  @Output('onReset') onReset: EventEmitter<string> = new EventEmitter<string>(); // todo - find better solution

  @ViewChild('inputElement') inputElement: ElementRef;
  @ViewChild('autoSuggest') resultContainer: ElementRef;

  constructor(public autoSuggestService: AutoSuggestService, private modalService: ModalService) {
  }

  ngOnInit() {
    this.distinctUntilChanged = true;
    this.displayResults = false;

    this.initResultsHandler();

    if (this.searchTextValue$) {
      this.searchTextValue$.subscribe(searchText => this.searchTextValue = searchText);
    }

    this.modalConfig.closeModalCallback = this.closeModalCallback;
  }

  initResultsHandler() {
    this.autoSuggestService.displayResults$.subscribe(d => {
      this.displayResults = d;
      if (d) {
        this.searchCallback(this.searchTextValue).subscribe(results => {
          if (results.length > 0) {
            this.showResults(results);
          } else {
            this.closeModal();
          }
        });
      } else {
        this.closeModal();
      }
    });
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

  ngAfterViewInit() {
    fromEvent(this.inputElement.nativeElement, 'input')
      .pipe(
        debounceTime(500),
        map(() => this.searchTextValue),
        distinctUntilChanged((a, b) => {
          return a.trim() === b.trim() && this.distinctUntilChanged;
        })
      )
      .subscribe(() => {
        this.resetSuggestState();
        this.autoSuggestService.textToSearch = this.searchTextValue;
        if (this.searchTextValue) {
          this.searchCallback(this.searchTextValue)
            .pipe(take(1))
            .subscribe(() => {
              this.autoSuggestService.requestResults();
            });
        } else {
          this.onReset.next('');
          this.autoSuggestService.displayResults$.next(false);
        }
      });
  }

  @HostListener('window:resize', ['$event'])
  initializeLeftPane(): void {
    this.closeModal();
  }

  showResults(originalResults) {
    const {x, y, width, height} = this.inputElement.nativeElement.getBoundingClientRect();
    const results = originalResults.slice(0, this.maxResultsToDisplay);
    const autoSuggestData = {
      results,
      inputWidth: width,
      setText: this.setText,
      closeModal: this.closeModal,
      onCloseIconClick: this.onCloseIconClick.bind(this)
    };

    if (!this.modal || !this.modalService.isModalOpen(this.modal.id)) {
      this.modal = this.modalService.open(AutoSuggestResultsComponent, this.modalConfig, autoSuggestData);
      this.modal.updateStyle({top: `${y + height}px`, left: `${x}px`})
    } else {
      this.modal && this.modal.updateComponentData(autoSuggestData);
    }
  }

  resetSuggestState()
    :
    void {
    this.results = [];
    this.selectedValue = null;
    this.distinctUntilChanged = true;
  }

  onCloseIconClick() {
    this.results = [];
    this.selectedValue = null;
    this.searchTextValue = '';
    this.distinctUntilChanged = false;
    this.closeModal();
  }

  setText = (selectedItem) => {
    this.searchTextValue = selectedItem.name;
    this.distinctUntilChanged = false;
    this.autoSuggestService.search(this.searchTextValue);
    this.onSelectValue.next(selectedItem);
  }

  showCloseButton = () => {
    return this.searchTextValue.length && (!this.modal || !this.modalService.isModalOpen(this.modal.id))
  }

  ngOnDestroy() {
    if (this.searchTextValue$) {
      this.searchTextValue$.unsubscribe();
    }

    this.autoSuggestService.displayResults$.unsubscribe();
  }
}

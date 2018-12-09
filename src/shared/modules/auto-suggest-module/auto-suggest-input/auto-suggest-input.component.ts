import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {SearchResult} from '../mock-results';
import {AutoSuggestService} from '../auto-suggest.service';
import {fromEvent, Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import {SVG_ICONS} from "../../svgIconModule/svg-icons.const";
import {ModalService} from "../../modalModule/modal.service";
import {AutoSuggestResultsComponent} from "../auto-suggest-results/auto-suggest-results.component";

@Component({
  selector: 'app-auto-suggest-input',
  templateUrl: './auto-suggest-input.component.html',
  styleUrls: ['./auto-suggest-input.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [AutoSuggestService]
})
export class AutoSuggestInputComponent implements OnInit, AfterViewInit {

  searchTextValue: string = '';
  displayResults: boolean = false;
  forceSuggest: boolean = true;
  selectedValue: string;
  results: SearchResult[] = [];

  SVG_ICONS: any = SVG_ICONS;

  modalConfig: IModalConfig = {
    hidCloseButton: true,
    modalClass: 'auto-suggest-results'
  };

  @Input() maxResultsToDisplay: number;
  @Input() searchCallback: (searchText) => Observable<any>;

  @ViewChild('inputElement') inputElement: ElementRef;
  @ViewChild('autoSuggest') resultContainer: ElementRef;

  constructor(public autoSuggestService: AutoSuggestService, private modalService: ModalService) {
  }

  ngOnInit() {
    this.forceSuggest = true;
    this.displayResults = false;

    this.autoSuggestService.displayResults$.subscribe(d => {
      this.displayResults = d;
      if (d) {
        this.searchCallback(this.searchTextValue).subscribe(results => {
          if (results.length > 0) {
            this.showResults(results);
          }
        });
      }
    });
  }

  ngAfterViewInit() {
    fromEvent(this.inputElement.nativeElement, 'input')
      .pipe(
        debounceTime(500),
        map(() => this.searchTextValue),
        distinctUntilChanged((a, b) => {
          return a.trim() === b.trim() && this.forceSuggest;
        })
      )
      .subscribe(() => {
        this.resetSuggestState();
        this.autoSuggestService.textToSearch = this.searchTextValue;
        if (this.searchTextValue) {
          this.searchCallback(this.searchTextValue)
            .subscribe(() => {
              this.autoSuggestService.requestResults();
            });
        } else {
          this.autoSuggestService.displayResults$.next(false);
        }
      });
  }

  @HostListener('window:resize', ['$event'])
  initializeLeftPane(): void {
    if (this.searchTextValue && this.modalService.isModalOpen()) {
      this.modalService.closeModal();
    }
  }

  showResults(results) {
    const {x, y, width, height} = this.inputElement.nativeElement.getBoundingClientRect();
    const autoSuggestData = {results, inputWidth: width, setText: this.setText};

    if (!this.modalService.isModalOpen()) {
      this.modalService.open(AutoSuggestResultsComponent, this.modalConfig, autoSuggestData);
      this.modalService.componentWrapper.style.left = `${x}px`;
      this.modalService.componentWrapper.style.top = `${y + height}px`;
    } else {
      this.modalService.updateComponentData(autoSuggestData);
    }
  }

  resetSuggestState(): void {
    this.results = [];
    this.selectedValue = null;
    this.forceSuggest = true;
  }

  setText = (text: string) => {
    this.searchTextValue = text;
    this.forceSuggest = false;
    this.autoSuggestService.search(this.searchTextValue);
  }
}

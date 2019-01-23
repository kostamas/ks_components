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
import {SVG_ICONS} from '../../svgIconModule/svg-icons.const';

@Component({
  selector: 'app-auto-suggest-results',
  templateUrl: './auto-suggest-results.component.html',
  styleUrls: ['./auto-suggest-results.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AutoSuggestResultsComponent implements AfterViewInit {
  public autoSuggestResultsStyle: any = {};
  public itemsResultsScrollStyle: any = {};
  public closeIconStyle: any = {};
  public selectedIndex: number = -1;
  public selectedValue: string = '';
  public SVG_ICONS: any = SVG_ICONS;

  private isHovered: boolean = false;

  @Input('data') data: any;

  @ViewChild('resultContainer') resultContainer: ElementRef;
  @ViewChild('closeIcon') closeIcon: ElementRef;

  constructor() {
  }

  ngAfterViewInit(): void {
    setTimeout(this.calcResultsPosition);
  }

  calcResultsPosition = () => {
    const viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    const {inputClientRect} = this.data;
    this.autoSuggestResultsStyle['min-width'] = `${inputClientRect.width}px`;
    this.closeIconStyle['left'] = `${(inputClientRect.width - 27)}px`;

    if (viewportHeight - inputClientRect.y < 320) {
      if (inputClientRect.y < 350) {
        this.itemsResultsScrollStyle['max-height'] = `${viewportHeight - inputClientRect.y - 80}px`;
        this.itemsResultsScrollStyle['overflow-y'] = 'auto';
        this.data.updateResultsPosition(inputClientRect.x, inputClientRect.y + inputClientRect.height);
      } else {
        const resultsHeight = this.resultContainer.nativeElement.clientHeight;
        this.closeIconStyle['top'] = 'auto';
        this.closeIconStyle['bottom'] = '-30px';
        this.data.updateResultsPosition(inputClientRect.x, inputClientRect.y - resultsHeight);
      }
    } else {
      this.data.updateResultsPosition(inputClientRect.x, inputClientRect.y + inputClientRect.height);
    }
    setTimeout(() => this.autoSuggestResultsStyle['opacity'] = '1');
  }

  @HostListener('document:keyup', ['$event'])
  keyUpHandler(keyEvent: KeyboardEvent): void {
    const key = keyEvent.key;

    switch (key.toUpperCase()) {
      case 'ENTER':
        if (this.selectedIndex < 0) {
          return;
        }
        this.data.setText(this.data.results[this.selectedIndex], true);
        break;
      case 'ARROWDOWN':
        this.nextIndex();
        break;
      case 'ARROWUP':
        this.previousIndex();
        break;
      case 'ARROWLEFT':
        break;
      case 'ARROWRIGHT':
        break;
      case 'ESCAPE':
        break;
      case 'PAGEUP':
        break;
      case 'PAGEDOWN':
        break;
      case 'HOME':
        this.firstIndex();
        break;
      case 'END':
        this.endIndex();
        break;
      case ' ':
        break;
    }
  }

  nextIndex(): void {
    if (!this.isHovered && this.selectedIndex + 1 !== this.data.results.length) {
      const nextIndex = this.selectedIndex + 1;
      this.setValue(nextIndex, false);
    }
  }

  firstIndex(): void {
    const firstIndex = 0;
    this.setValue(firstIndex, true);
  }

  endIndex(): void {
    const endIndex = this.data.results.length - 1;
    this.setValue(endIndex, false);
  }

  previousIndex(): void {
    if (!this.isHovered && this.selectedIndex - 1 > -1) {
      const previousIndex = this.selectedIndex - 1;
      this.setValue(previousIndex, false);
    }
  }

  isSelected(itemIndex: number): string {
    return itemIndex === this.selectedIndex ? 'selected' : '';
  }

  setValue(index: number, closeReults: boolean): void {
    if (this.data.results.length > 0) {
      this.selectedIndex = index;
      const selected = this.data.results[index];
      this.selectedValue = selected.value;
      const scrollContainer: any = this.resultContainer.nativeElement.getClientRects()[0];
      const scrollPercentage: number = ((this.selectedIndex * (scrollContainer.height / (this.data.results.length - this.selectedIndex))) / scrollContainer.height) * 100;
      this.resultContainer.nativeElement.scrollTop = scrollPercentage;
      this.data.setText(selected, closeReults);

    }
  }

  selectResultHandler(index: number): any {
    this.setValue(index, true);
  }

  mouseEnterHandler(): any {
    this.selectedIndex = -1;
    this.isHovered = true;
  }

  mouseLeaveHandler(): any {
    this.isHovered = false;
  }

  onCloseIconClick(): any {
    this.data.onCloseIconClick();
  }
}

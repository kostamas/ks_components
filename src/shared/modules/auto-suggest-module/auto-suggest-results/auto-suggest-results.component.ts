import {Component, ElementRef, HostListener, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {SVG_ICONS} from "../../svgIconModule/svg-icons.const";

@Component({
  selector: 'app-auto-suggest-results',
  templateUrl: './auto-suggest-results.component.html',
  styleUrls: ['./auto-suggest-results.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AutoSuggestResultsComponent implements OnInit {
  public autoSuggestResultsStyle: any = {};
  public selectedIndex: number = -1;
  public selectedValue: string = '';
  public SVG_ICONS: any = SVG_ICONS;

  private isHovered: boolean = false;

  @Input('data') data: any;

  @ViewChild('autoSuggest') resultContainer: ElementRef;

  constructor() {
  }

  ngOnInit() {
    this.autoSuggestResultsStyle.width = this.data.inputWidth + 'px';
  }

  @HostListener('document:keyup', ['$event'])
  keyUpHandler(keyEvent: KeyboardEvent): void {
    const key = keyEvent.key;

    switch (key.toUpperCase()) {
      case 'ENTER':
        if (this.selectedIndex < 0) {
          return;
        }
        this.data.setText(this.data.results[this.selectedIndex]);
        this.data.closeModal();
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
      this.setValue(nextIndex, true);
    }
  }

  firstIndex(): void {
    const firstIndex = 0;
    this.setValue(firstIndex, true);
  }

  endIndex(): void {
    const endIndex = this.data.results.length - 1;
    this.setValue(endIndex, true);
  }

  previousIndex(): void {
    if (!this.isHovered && this.selectedIndex - 1 > -1) {
      const previousIndex = this.selectedIndex - 1;
      this.setValue(previousIndex, true);
    }
  }

  isSelected(itemIndex: number): string {
    return itemIndex === this.selectedIndex ? 'selected' : '';
  }

  setValue(index: number, setText: boolean = false): void {
    if (this.data.results.length > 0) {
      this.selectedIndex = index;
      const selected = this.data.results[index];
      this.selectedValue = selected.value;
      const scrollContainer: any = this.resultContainer.nativeElement.getClientRects()[0];
      const scrollPercentage: number = ((this.selectedIndex * (scrollContainer.height / (this.data.results.length - this.selectedIndex))) / scrollContainer.height) * 100;
      this.resultContainer.nativeElement.scrollTop = scrollPercentage;

      if (setText) {
        this.data.setText(selected);
      }
    }
  }

  selectResultHandler(index): any {
    this.setValue(index, true);
    this.data.closeModal();
  }

  mouseEnterHandler(): any {
    this.selectedIndex = -1;
    this.isHovered = true;
  }

  mouseLeaveHandler(): any {
    this.isHovered = false;
  }

  onCloseIconClick(): any {
    this.data.onCloseIconClick()
  }
}

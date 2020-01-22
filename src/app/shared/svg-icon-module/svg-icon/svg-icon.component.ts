import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {SafeHtml} from '@angular/platform-browser';
import {SvgIconService} from '../../../services/svg-icons.service';

@Component({
  selector: 'app-svg-icon',
  template: '<div [ngClass]="this.svg" [innerHtml]="this.svgIcon"></div>',
  encapsulation: ViewEncapsulation.None
})
export class SvgIconComponent implements OnInit, OnChanges {
  public svgIcon: SafeHtml = '';

  @Input('svg') svg: string;

  constructor(private svgIconService: SvgIconService) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.svg) {
      this.svgIcon = this.svgIconService.svgIcons[changes.svg.currentValue];
    }
  }
}

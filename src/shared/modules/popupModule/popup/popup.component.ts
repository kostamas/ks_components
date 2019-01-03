import {Component, Input, OnInit} from '@angular/core';
import {POPUP_TYPES} from '../popup.constant';
import {IPopupTypes} from "../../../types/modal";

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  public POPUP_TYPES: IPopupTypes = POPUP_TYPES;

  @Input() data: any;
  @Input() closeModal: any;

  constructor() {
  }

  ngOnInit() {
  }
}

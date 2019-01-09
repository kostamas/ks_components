import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {ModalService} from '../../modalModule/modal.service';
import {IModal, IModalConfig} from '../../../types/modal';
import {IMultipleSelectItem} from '../../../types/IMultipleSelect';

@Component({
  selector: 'app-multiple-select-input',
  templateUrl: './multiple-select-input.component.html',
  styleUrls: ['./multiple-select-input.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MultipleSelectInputComponent implements OnInit {

  modalLoaded: boolean = false;
  modalConfig: IModalConfig;
  modal: IModal;

  @Input() selectList: any[];
  @Input() optionsComponent: any;
  @Input() inputTextHandler: (p: any, list: any[]) => any;

  @Output('multiSelectChanged') multiSelectChanged: EventEmitter<IMultipleSelectItem> = new EventEmitter();

  @ViewChild('multipleInput') multipleInput: ElementRef;
  @ViewChild('title') title: ElementRef;

  constructor(public modalService: ModalService, private zone: NgZone) {
  }

  ngOnInit(): void {
    let text = '';
    if (this.inputTextHandler) {
      const selectedOption = this.selectList.filter(option => option.isSelected)[0];
      text = this.inputTextHandler(selectedOption, this.selectList);
    } else {
      this.selectList.forEach(option => option.isSelected ? text = option.text : '');
    }
    this.setText(text);

    this.zone.runOutsideAngular(() => window.addEventListener('resize', this.resizeHandler.bind(this)));
  }

  resizeHandler(): void {
    if (this.modal && this.modalService.isModalOpen(this.modal.id)) {
      this.modal.closeModal();
    }
  }

  multipleSelectClickHandler(): void {
    const {x, y, width} = this.multipleInput.nativeElement.getBoundingClientRect();
    this.modalConfig = {
      modalClass: 'multiple-select-result-modal',
      position: {x, y: y + 35},
      hidCloseButton: true,
      style: {width: `${width - 2}px`},
      closeModalCallback: () => this.modal = null
    };
    const data: any = {
      selectList: this.selectList,
      getSelection: (key, value, closeModal?: boolean) => {
        this.selectList[key].isSelected = value;
        let inputText = this.selectList[key].text;
        if (this.inputTextHandler) {
          inputText = this.inputTextHandler(this.selectList[key], this.selectList);
        }
        this.setText(inputText);
        this.multiSelectChanged.emit(this.selectList[key]);

        if (closeModal) {
          this.modal.closeModal();
        }
      },
    };
    this.modal = this.modalService.open(this.optionsComponent, this.modalConfig, data);
    this.modalLoaded = true;
  }

  setText = (text: any) => {
    this.title.nativeElement.innerHTML = text;
  }
}

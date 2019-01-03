import {
  ChangeDetectorRef,
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
import {MultipleSelectResultsComponent} from '../multiple-select-results/multiple-select-results.component';
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

  @Input() selectList: IMultipleSelectItem[];

  @Output('multiSelectChanged') multiSelectChanged: EventEmitter<IMultipleSelectItem> = new EventEmitter();

  @ViewChild('multipleInput') multipleInput: ElementRef;
  @ViewChild('title') title: ElementRef;

  constructor(public modalService: ModalService, private zone: NgZone, private cdRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.multipleSelectTextInput();

    this.zone.runOutsideAngular(() => window.addEventListener('resize', this.resizeHandler.bind(this)));
  }

  resizeHandler(): void {
    if (this.modal && this.modalService.isModalOpen(this.modal.id)) {
      this.modal.closeModal();
    }
  }

  multipleSelectClickHandler(): void {
    const {x, y} = this.multipleInput.nativeElement.getBoundingClientRect();
    this.modalConfig = {
      modalClass: 'multiple-select-result-modal',
      position: {x, y: y + 35},
      hidCloseButton: true,
      closeModalCallback: () => this.modal = null
    };
    const data: any = {
      selectList: this.selectList,
      getSelection: (key, value) => {
        this.selectList[key].isSelected = value;
        this.multipleSelectTextInput();
        this.multiSelectChanged.emit(this.selectList[key]);
      },
      resetSelection: () => {
        this.multiSelectChanged.emit({text: 'All', value: 'All', isSelected: true});
        this.multipleSelectTextInput();
      }
    };
    this.modal = this.modalService.open(MultipleSelectResultsComponent, this.modalConfig, data);
    this.modalLoaded = true;
  }

  multipleSelectTextInput = () => {
    let selectedText: string = 'Show: ';
    const selectionCount: number = this.selectList.filter(m => m.isSelected).length;
    if (selectionCount > 0) {
      selectedText += 'Selected (' + selectionCount + ')';
    } else {
      selectedText += ' All';
    }
    this.title.nativeElement.innerHTML = selectedText;
  }
}

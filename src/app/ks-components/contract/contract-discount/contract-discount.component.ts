import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import {CreateOneContractService} from '../create-one-contract.service';
import {CreateOneContractStoreService} from '../create-one-contract-store.service';
import {filter} from 'rxjs/operators';
import {IRadioButton} from '../../../shared/types/buttons';
import {ISvgIcons, SVG_ICONS} from '../../../shared/svg-icon-module/svg-icons.const';
import {ISelectItem} from '../../../shared/types/ISelect';
import {IOneContractParams} from '../one-contract-object';
import {SelectInputService} from '../../../shared/services/select-input.service';
import {CommonOneContractService} from '../common-one-contract.service';
import {JsUtils} from '../../../utils/jsUtils';
import {DISCOUNTS_TYPES} from '../one-contract.const';

@Component({
  selector: 'app-contract-discount',
  templateUrl: './contract-discount.component.html',
  styleUrls: ['./contract-discount.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ContractDiscountComponent implements OnInit, OnDestroy {
  public sharedAllotmentOptions: IRadioButton[];
  public subscriptionsArray: any[] = [];
  public SVG_ICONS: ISvgIcons = SVG_ICONS;
  public displayForm: boolean;
  public typeOptions: ISelectItem[] = [
    {id: 'CP', name: 'Contract Period', isSelected: true}, {id: 'SD', name: 'Specific Dates'}
  ];

  @Input() discountSrv: any;
  @Input() discountType: any;
  @Input('getRowsFromContract') getRowsFromContract: (oneContract: IOneContractParams) => any[];

  constructor(public oneContractService: CreateOneContractService, public selectInputService: SelectInputService,
              private oneContractStoreService: CreateOneContractStoreService,
              private commonOneContractService: CommonOneContractService) {
  }

  ngOnInit(): void {
    this.displayForm = false;
    this.sharedAllotmentOptions = JsUtils.deepCopy(this.commonOneContractService.getSharedAllotmentOptions());
    this.subscriptionsArray.push(
      this.oneContractStoreService.oneContract$
        .pipe(filter(contract => !contract || !contract.dontUpdateView))
        .subscribe(this.resetParameters)
    );
  }

  resetParameters = (oneContract: IOneContractParams) => {
    this.discountSrv.resetParams();

    const rowsFromContract: any = this.getRowsFromContract(oneContract);
    if (rowsFromContract && rowsFromContract.length) {
      this.discountSrv.params.shardAllotment = rowsFromContract[0].sharedAllotment;
      this.sharedAllotmentOptions[0].isSelected = rowsFromContract[0].sharedAllotment;
      this.sharedAllotmentOptions[1].isSelected = !rowsFromContract[0].sharedAllotment;
      this.sharedAllotmentOptions = [...this.sharedAllotmentOptions];
      this.displayForm = true;
    }

    for (let i = 0; i < rowsFromContract.length; i++) {
      this.addRow();
      this.discountSrv.params.discountRows[i].seasonCode = rowsFromContract[i].seasons[0].seasonCode;
      this.selectInputService.updateIsSelected(this.discountSrv.params.discountRows[i].seasonTypeList, null, rowsFromContract[i].seasons[0].seasonCode);
      if (JsUtils.isDefineAndNotNull(rowsFromContract[i].seasons[0].value)) {
        this.discountSrv.params.discountRows[i].discount = rowsFromContract[i].seasons[0].value + '';
        this.oneContractStoreService.selectedDiscounts[DISCOUNTS_TYPES[this.discountType]] = true;
        this.oneContractStoreService.selectedDiscounts$.next(this.oneContractStoreService.selectedDiscounts);
      }
      if (rowsFromContract[i].seasons && rowsFromContract[i].seasons[0] && rowsFromContract[i].seasons[0].bookingWindow) {
        this.discountSrv.params.discountRows[i].bookingWindow = rowsFromContract[i].seasons[0].bookingWindow;
      }
      if (rowsFromContract[i].seasons && rowsFromContract[i].seasons[0] && rowsFromContract[i].seasons[0].travelWindow) {
        this.discountSrv.params.discountRows[i].travelWindow = rowsFromContract[i].seasons[0].travelWindow;
      }
    }
  };

  addRow(): void {
    let seasonTypeList: ISelectItem[] = JsUtils.deepCopy(this.typeOptions);
    const params = this.discountSrv.params;
    if (params.discountRows.length > 0) {
      params.discountRows[0].seasonTypeList = this.selectInputService.removeItemsFromList(params.discountRows[0].seasonTypeList, null, 'CP');
      seasonTypeList = this.selectInputService.removeItemsFromList(seasonTypeList, null, 'CP');
      this.selectInputService.updateIsSelected(seasonTypeList, null, 'SD');
    }
    const discountNewRow: any = {
      discount: null,
      seasonCode: (<ISelectItem>this.selectInputService.getSelectedItem(seasonTypeList, false)).id,
      seasonTypeList: seasonTypeList,
      isCalendarOpen: false
    };
    params.discountRows.push(discountNewRow);
  }

  deleteRow(rowNumber: any): void {
    const params = this.discountSrv.params;
    params.discountRows.splice(rowNumber, 1);
    if (params.discountRows.length === 1) {
      if (!this.selectInputService.isContains(params.discountRows[0], null, 'CP')) {
        params.discountRows[0].seasonTypeList.unshift({id: 'CP', name: 'Contract Period'});
      }
    }
  }

  discountTypeHandler = () => {
    setTimeout(() => this.oneContractService.discountTypeHandler(this.discountType));
  };

  isAddRowDisabled(): boolean {
    const {discountRows} = this.discountSrv.params;
    return discountRows.length > 0 && discountRows[0].seasonCode === 'CP';
  }

  radioButtonClick(radioButton: IRadioButton): void {
    this.discountSrv.params.shardAllotment = radioButton.id;
  }

  onSelectItem($event: ISelectItem, index: number, param: string): void {
    this.discountSrv.params.discountRows[index][param] = $event.id;
  }

  ngOnDestroy(): void {
    this.subscriptionsArray.forEach((subscription: any) => subscription.unsubscribe());
    this.discountSrv.resetParams();
  }
}

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import {CreateOneContractService} from '../create-one-contract.service';
import {ContractPayStayService} from './contract-pay-stay.service';
import {CreateOneContractStoreService} from '../create-one-contract-store.service';
import {filter} from 'rxjs/operators';
import {IContractSelectedDiscounts, IFreeSaleParams} from '../one-contract';
import {ISvgIcons, SVG_ICONS} from '../../../shared/svg-icon-module/svg-icons.const';
import {InputUtils} from '../../../utils/input-utils';
import {SelectInputService} from '../../../shared/services/select-input.service';
import {CommonOneContractService} from '../common-one-contract.service';
import {IFree, IOneContractParams} from '../one-contract-object';
import {JsUtils} from '../../../utils/jsUtils';
import {ISelectItem} from '../../../shared/types/ISelect';
import {DISCOUNTS_TYPES} from '../one-contract.const';

@Component({
  selector: 'app-contract-pay-stay',
  templateUrl: './contract-pay-stay.component.html',
  styleUrls: ['./contract-pay-stay.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContractPayStayComponent implements OnInit, OnDestroy {
  public selectedDiscounts: IContractSelectedDiscounts = <IContractSelectedDiscounts>{};
  public tableHeader: string[] = ['Type', 'Pay', 'Stay', 'NRF', ''];
  public SVG_ICONS: ISvgIcons = SVG_ICONS;
  public subscriptionsArray: any[] = [];
  public displayForm: boolean = false;
  public numberOnly: any = InputUtils.numberOnly;
  public preventPasteValue: any = InputUtils.preventPasteValue;

  constructor(public oneContractService: CreateOneContractService, private selectInputService: SelectInputService,
              public contractPayStayService: ContractPayStayService, private changeDetector: ChangeDetectorRef,
              private oneContractStoreService: CreateOneContractStoreService,
              private createOneContractService: CreateOneContractService,
              public commonOneContractService: CommonOneContractService) {
  }

  ngOnInit(): void {
    const {oneContractStoreService, subscriptionsArray} = this;
    const selectedDiscounts$ = oneContractStoreService.selectedDiscounts$;
    subscriptionsArray.push(selectedDiscounts$.subscribe(selectedDiscounts => {
      this.selectedDiscounts = selectedDiscounts;
      setTimeout(() => this.changeDetector.detectChanges());
    }));
    this.subscriptionsArray.push(
      this.oneContractStoreService.oneContract$
        .pipe(filter(contract => !contract || !contract.dontUpdateView))
        .subscribe((oneContract: IOneContractParams) => setTimeout(() => this.resetParameters(oneContract))));
  }

  resetParameters = (oneContract: IOneContractParams) => {
    const freeSale: IFree[] = oneContract && oneContract.contractData && JsUtils.deepCopy(oneContract.contractData.free);
    this.contractPayStayService.tableRows = [];
    this.contractPayStayService.resetParams();
    this.displayForm = false;

    if (freeSale && freeSale.length > 0) {
      this.displayForm = true;
      for (let i = 0; i < freeSale.length; i++) {
        this.addRow();
        if (freeSale[i].seasons[0]) {
          this.onSelectItem({name: '', id: freeSale[i].seasons[0].seasonCode}, i, 'type');
          this.selectInputService.updateIsSelected(this.contractPayStayService.tableRows[i].periodTypeOptions, null, freeSale[i].seasons[0].seasonCode);
        }
        if (JsUtils.isDefined(freeSale[i].payNights)) {
          this.contractPayStayService.tableRows[i].payNights = freeSale[i].payNights;
        }
        if (JsUtils.isDefined(freeSale[i].stayNights)) {
          this.contractPayStayService.tableRows[i].stayNights = freeSale[i].stayNights;
        }
        if (JsUtils.isDefined(freeSale[i].isNRF)) {
          this.onSelectItem({name: '', id: freeSale[i].isNRF}, i, 'nrf');
          this.selectInputService.updateIsSelected(this.contractPayStayService.tableRows[i].nrfOptions, null, freeSale[i].isNRF);
        }
        if (freeSale[i].seasons[0].bookingWindow) {
          this.contractPayStayService.tableRows[i].bookingWindow = freeSale[i].seasons[0].bookingWindow;
        }
        if (freeSale[i].seasons[0].travelWindow) {
          this.contractPayStayService.tableRows[i].travelWindow = freeSale[i].seasons[0].travelWindow;
        }
      }
    }
    setTimeout(() => this.changeDetector.detectChanges());
  };

  onSelectItem(selectedOption: ISelectItem, rowNumber: number, paramName: string): void {
    this.contractPayStayService.tableRows[rowNumber][paramName] = selectedOption.id;
  }

  addRow(): void {
    const newRow: IFreeSaleParams = <IFreeSaleParams>{
      periodTypeOptions: this.oneContractService.getPeriodTypeOptions(),
      nrfOptions: this.oneContractService.getNrfOptions()
    };
    this.contractPayStayService.tableRows.push(newRow);
    if (this.contractPayStayService.tableRows.length > 1) {
      this.contractPayStayService.tableRows.forEach(row => row.periodTypeOptions = this.selectInputService.removeItemsFromList(row.periodTypeOptions, null, 'CP'));
      this.selectInputService.updateIsSelected(newRow.periodTypeOptions, null, null);
    } else {
      newRow.type = 'CP';
    }
  }

  deleteRow(rowNumber: number): void {
    this.contractPayStayService.tableRows.splice(rowNumber, 1);
    if (this.contractPayStayService.tableRows.length === 1) {
      this.contractPayStayService.tableRows[0].periodTypeOptions.unshift({name: 'Contract Period', id: 'CP'});
    }
  }

  isAddRowDisabled(): boolean {
    const params = this.contractPayStayService.tableRows;
    return params && params.length > 0 && params[0].type === 'CP';
  }

  payStayHandler(): void {
    setTimeout(() => this.createOneContractService.discountTypeHandler(DISCOUNTS_TYPES.freeNights));
  }

  ngOnDestroy(): void {
    this.subscriptionsArray.forEach((subscription: any) => subscription.unsubscribe());
    this.contractPayStayService.resetParams();
  }
}

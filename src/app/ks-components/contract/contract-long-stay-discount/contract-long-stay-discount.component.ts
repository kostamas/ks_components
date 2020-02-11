import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import {filter} from 'rxjs/operators';
import {IRadioButton} from '../../../shared/types/buttons';
import {ISvgIcons, SVG_ICONS} from '../../../shared/svg-icon-module/svg-icons.const';
import {InputUtils} from '../../../utils/input-utils';
import {SelectInputService} from '../../../shared/services/select-input.service';
import {CreateOneContractService} from '../create-one-contract.service';
import {ContractLongStayDiscountService} from './contract-long-stay-discount.service';
import {CreateOneContractStoreService} from '../create-one-contract-store.service';
import {CommonOneContractService} from '../common-one-contract.service';
import {ILongStayDiscount, IOneContractParams} from '../one-contract-object';
import {JsUtils} from '../../../utils/jsUtils';
import {DISCOUNTS_TYPES} from '../one-contract.const';
import {ISelectItem} from '../../../shared/types/ISelect';
import {ILongStayDiscountParams} from '../one-contract';

@Component({
  selector: 'app-contract-long-stay-discount',
  templateUrl: './contract-long-stay-discount.component.html',
  styleUrls: ['./contract-long-stay-discount.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContractLongStayDiscountComponent implements OnInit, OnDestroy {
  public sharedAllotmentOptions: IRadioButton[];
  public subscriptionsArray: any[] = [];
  public SVG_ICONS: ISvgIcons = SVG_ICONS;
  public displayForm: boolean = false;
  public tableHeader: string[] = ['Type', 'Stay Nights', 'Discount', 'NRF', ''];
  public tableRows: any[] = [];
  public numberOnly: any = InputUtils.numberOnly;
  public preventPasteValue: any = InputUtils.preventPasteValue;

  constructor(private selectInputService: SelectInputService, public oneContractService: CreateOneContractService,
              private contractLongStayService: ContractLongStayDiscountService,
              private oneContractStoreService: CreateOneContractStoreService,
              public commonOneContractService: CommonOneContractService,
              private changeDetector: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.sharedAllotmentOptions = this.contractLongStayService.commonOneContractService.getSharedAllotmentOptions();
    this.subscriptionsArray.push(
      this.oneContractStoreService.oneContract$
        .pipe(filter(contract => !contract || !contract.dontUpdateView))
        .subscribe(this.resetParameters));
  }

  resetParameters = (oneContract: IOneContractParams) => {
    this.tableRows = [];
    this.contractLongStayService.resetParams();
    this.displayForm = false;
    if (oneContract) {
      const discounts: ILongStayDiscount[] = JsUtils.deepCopy(oneContract.contractData.generalSupplements.longStayDiscount);
      this.contractLongStayService.contractLongStayDiscountParams = [];

      for (let i = 0; i < discounts.length; i++) {
        this.displayForm = true;
        this.addRow();
        if (discounts[i].seasons) {
          this.onSelectItem({name: '', id: discounts[i].seasons[0].seasonCode}, i, 'periodType');
          this.selectInputService.updateIsSelected(this.tableRows[i].periodTypeOptions, null, discounts[i].seasons[0].seasonCode);
        }
        if (JsUtils.isDefined(discounts[i].isNRF)) {
          this.onSelectItem({name: '', id: discounts[i].isNRF}, i, 'nrf');
          this.selectInputService.updateIsSelected(this.tableRows[i].nrfOptions, null, discounts[i].isNRF);
        }
        if (discounts[i].stayNights) {
          this.contractLongStayService.contractLongStayDiscountParams[i].stayNights = discounts[i].stayNights;
        }

        if (discounts[i].seasons[0].value) {
          this.contractLongStayService.contractLongStayDiscountParams[i].discount = discounts[i].seasons[0].value;
          this.oneContractStoreService.selectedDiscounts[DISCOUNTS_TYPES['longStayDiscount']] = true;
          this.oneContractStoreService.selectedDiscounts$.next(this.oneContractStoreService.selectedDiscounts);
        }
        if (discounts[i].seasons[0].bookingWindow) {
          this.contractLongStayService.contractLongStayDiscountParams[i].bookingWindow = {
            dateFrom: discounts[i].seasons[0].bookingWindow.dateFrom,
            dateTo: discounts[i].seasons[0].bookingWindow.dateTo
          };
        }
        if (discounts[i].seasons[0].travelWindow) {
          this.contractLongStayService.contractLongStayDiscountParams[i].travelWindow = {
            dateFrom: discounts[i].seasons[0].travelWindow.dateFrom,
            dateTo: discounts[i].seasons[0].travelWindow.dateTo
          };
        }
      }
    }
    setTimeout(() => this.changeDetector.detectChanges());
  };

  onSelectItem(selectedOption: ISelectItem, rowNumber: number, paramName: string): void {
    this.contractLongStayService.contractLongStayDiscountParams[rowNumber][paramName] = selectedOption.id;
  }

  discountTypeHandler = (discountType: string) => {
    setTimeout(() => this.oneContractService.discountTypeHandler(discountType));
  };

  addRow(): void {
    this.tableRows.push({
      periodTypeOptions: this.oneContractService.getPeriodTypeOptions(),
      nrfOptions: this.oneContractService.getNrfOptions()
    });
    if (this.tableRows.length > 1) {
      this.tableRows.forEach(row => row.periodTypeOptions = this.selectInputService.removeItemsFromList(row.periodTypeOptions, null, 'CP'));
      this.contractLongStayService.contractLongStayDiscountParams.push(<ILongStayDiscountParams>{});
    } else {
      this.contractLongStayService.contractLongStayDiscountParams.push(<ILongStayDiscountParams>{periodType: 'CP'});
    }
  }

  isAddRowDisabled(): boolean {
    const params = this.contractLongStayService.contractLongStayDiscountParams;
    return params && params[0] && params[0].periodType === 'CP';
  }

  deleteRow(rowNumber: number): void {
    this.tableRows.splice(rowNumber, 1);
    this.contractLongStayService.contractLongStayDiscountParams.splice(rowNumber, 1);
    const discounts = this.contractLongStayService.contractLongStayDiscountParams.filter((params: ILongStayDiscountParams) => params.discount && params.discount > 0);
    if (!discounts.length) {
      delete this.oneContractStoreService.selectedDiscounts[DISCOUNTS_TYPES.longStayDiscount];
      this.oneContractStoreService.selectedDiscounts$.next(this.oneContractStoreService.selectedDiscounts);
    }

    if (this.tableRows.length === 1) {
      this.tableRows[0].periodTypeOptions.unshift({name: 'Contract Period', id: 'CP'});
    }
  }

  ngOnDestroy(): void {
    this.subscriptionsArray.forEach((subscription: any) => subscription.unsubscribe());
    this.contractLongStayService.resetParams();
  }
}

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import {CreateOneContractService} from '../create-one-contract.service';
import {ContractEarlyBookingDiscountService} from './contract-early-booking-discount.service';
import {CreateOneContractStoreService} from '../create-one-contract-store.service';
import {AppCommonService} from '../../../../app-common.service';
import {filter} from 'rxjs/operators';
import {ISvgIcons, SVG_ICONS} from '../../../shared/svg-icon-module/svg-icons.const';
import {IContractSelectedDiscounts, IEarlyBookingDiscountParams} from '../one-contract';
import {ISelectItem} from '../../../shared/types/ISelect';
import {InputUtils} from '../../../utils/input-utils';
import {IRadioButton} from '../../../shared/types/buttons';
import {SelectInputService} from '../../../shared/services/select-input.service';
import {CommonOneContractService} from '../common-one-contract.service';
import {IEarlyBookingDiscount, IOneContractParams} from '../one-contract-object';
import {JsUtils} from '../../../utils/jsUtils';
import {DISCOUNTS_TYPES} from '../one-contract.const';
import {CalendarDatePickerService} from '../../../shared/services/calendarDatePicker.service';

@Component({
  selector: 'app-contract-early-booking-discount',
  templateUrl: './contract-early-booking-discount.component.html',
  styleUrls: ['./contract-early-booking-discount.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContractEarlyBookingDiscountComponent implements OnInit, OnDestroy {
  public SVG_ICONS: ISvgIcons = SVG_ICONS;
  public displayForm: boolean = false;
  public tableRows: any[] = [];
  public subscriptionsArray: any[] = [];
  public tableHeader: string[] = [
    'Type', 'Days before check-in', 'Min Stay Nights', 'Discount', 'NRF', ''
  ];
  public selectedDiscounts: IContractSelectedDiscounts = <IContractSelectedDiscounts>{};
  public sharedAllotmentOptions: IRadioButton[];
  public numberOnly: any = InputUtils.numberOnly;
  public isRangeValue: any = InputUtils.isRangeValue;

  private minStayOptionsOptions: ISelectItem[] = [
    {name: '2', id: 2}, {name: '3', id: 3}, {name: '4', id: 4}, {name: '5', id: 5}, {name: '6', id: 6},
    {name: '7', id: 7}, {name: '8', id: 8}, {name: '9', id: 9}, {name: '10', id: 10}, {name: '11', id: 11},
    {name: '12', id: 12}, {name: '13', id: 13}, {name: '14', id: 14}
  ];

  constructor(private calendarDatePickerService: CalendarDatePickerService,
              public oneContractService: CreateOneContractService, private changeDetector: ChangeDetectorRef,
              private selectInputService: SelectInputService, public appCommonService: AppCommonService,
              private contractEarlyBookingService: ContractEarlyBookingDiscountService,
              private oneContractStoreService: CreateOneContractStoreService,
              public commonOneContractService: CommonOneContractService) {
  }

  ngOnInit(): void {
    this.displayForm = false;
    this.sharedAllotmentOptions = this.contractEarlyBookingService.commonOneContractService.getSharedAllotmentOptions();
    const {oneContractStoreService, subscriptionsArray} = this;
    const selectedDiscounts$ = oneContractStoreService.selectedDiscounts$;
    subscriptionsArray.push(selectedDiscounts$.subscribe(selectedDiscounts => {
      this.selectedDiscounts = selectedDiscounts;
      setTimeout(() => this.changeDetector.detectChanges());
    }));
    this.subscriptionsArray.push(
      this.oneContractStoreService.oneContract$
        .pipe(filter(contract => !contract || !contract.dontUpdateView))
        .subscribe(this.resetParameters));
  }

  resetParameters = (oneContractObj: IOneContractParams) => {
    this.displayForm = false;
    this.contractEarlyBookingService.resetParams();
    this.tableRows = [];
    this.sharedAllotmentOptions = this.contractEarlyBookingService.commonOneContractService.getSharedAllotmentOptions();
    if (oneContractObj) {
      const discounts: IEarlyBookingDiscount[] = JsUtils.deepCopy(oneContractObj.contractData.generalSupplements.earlyBookingDiscount);
      this.tableRows = [];
      this.contractEarlyBookingService.earlyBookingDiscountParams = [];
      for (let i = 0; i < discounts.length; i++) {
        this.displayForm = true;
        this.addRow();
        if (discounts[i]) {
          if (discounts[i].seasons && discounts[i].seasons.length > 0) {
            this.contractEarlyBookingService.earlyBookingDiscountParams[i].discount = discounts[i].seasons[0].value;
            this.oneContractStoreService.selectedDiscounts[DISCOUNTS_TYPES['earlyBookingDiscount']] = true;
            this.oneContractStoreService.selectedDiscounts$.next(this.oneContractStoreService.selectedDiscounts);
            this.onSelectItem({name: '', id: discounts[i].seasons[0].seasonCode}, i, 'type');
            this.selectInputService.updateIsSelected(this.tableRows[i].periodTypeOptions, null, discounts[i].seasons[0].seasonCode);
          }
        }

        if (discounts[i].daysBefore) {
          this.contractEarlyBookingService.earlyBookingDiscountParams[i].daysBeforeCheckIn = discounts[i].daysBefore;
        }
        if (discounts[i].stayNights) {
          this.onSelectItem({name: '', id: discounts[i].stayNights}, i, 'minStay');
          this.selectInputService.updateIsSelected(this.tableRows[i].minStayOptionsOptions, null, discounts[i].stayNights);
        }
        if (JsUtils.isDefined(discounts[i].isNRF)) {
          this.onSelectItem({name: '', id: discounts[i].isNRF}, i, 'nrf');
          this.selectInputService.updateIsSelected(this.tableRows[i].nrfOptions, null, discounts[i].isNRF);
        }
        if (discounts[i].seasons[0].bookingWindow) {
          this.contractEarlyBookingService.earlyBookingDiscountParams[i].bookingWindow = {
            dateFrom: discounts[i].seasons[0].bookingWindow.dateFrom,
            dateTo: discounts[i].seasons[0].bookingWindow.dateTo
          };
        }
        if (discounts[i].seasons[0].travelWindow) {
          this.contractEarlyBookingService.earlyBookingDiscountParams[i].travelWindow = {
            dateFrom: discounts[i].seasons[0].travelWindow.dateFrom,
            dateTo: discounts[i].seasons[0].travelWindow.dateTo
          };
        }
      }
    }
    setTimeout(() => this.changeDetector.detectChanges());
  };

  addRow(): void {
    this.tableRows.push({
      periodTypeOptions: this.oneContractService.getPeriodTypeOptions(),
      nrfOptions: this.oneContractService.getNrfOptions(),
      minStayOptionsOptions: JsUtils.deepCopy(this.minStayOptionsOptions)
    });
    if (this.tableRows.length > 1) {
      this.tableRows.forEach(row => row.periodTypeOptions = this.selectInputService.removeItemsFromList(row.periodTypeOptions, null, 'CP'));
      this.contractEarlyBookingService.earlyBookingDiscountParams.push(<IEarlyBookingDiscountParams>{});
    } else {
      this.contractEarlyBookingService.earlyBookingDiscountParams.push(<IEarlyBookingDiscountParams>{type: 'CP'});
    }
  }

  onSelectItem(selectedOption: ISelectItem, rowNumber: number, paramName: string): void {
    this.contractEarlyBookingService.earlyBookingDiscountParams[rowNumber][paramName] = selectedOption.id;
  }

  discountTypeHandler = (discountType: string) => {
    setTimeout(() => this.oneContractService.discountTypeHandler(discountType));
  };

  deleteRow(rowNumber: number): void {
    this.tableRows.splice(rowNumber, 1);
    this.contractEarlyBookingService.earlyBookingDiscountParams.splice(rowNumber, 1);
    const discounts = this.contractEarlyBookingService.earlyBookingDiscountParams.filter((params: IEarlyBookingDiscountParams) => params.discount && +params.discount > 0);
    if (!discounts.length) {
      delete this.selectedDiscounts[DISCOUNTS_TYPES['earlyBookingDiscount']];
      this.oneContractStoreService.selectedDiscounts$.next(this.selectedDiscounts);
    }

    if (this.tableRows.length === 1) {
      this.tableRows[0].periodTypeOptions.unshift({name: 'Contract Period', id: 'CP'});
    }
  }

  isAddRowDisabled(): boolean {
    const params = this.contractEarlyBookingService.earlyBookingDiscountParams;
    return params && params[0] && params[0].type === 'CP';
  }

  ngOnDestroy(): void {
    this.subscriptionsArray.forEach((subscription: any) => subscription.unsubscribe());
    this.tableRows = [];
    this.contractEarlyBookingService.resetParams();
  }
}

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import {ContractCombinationsService} from './contract-combinations.service';
import {ContractEarlyBookingDiscountService} from '../contract-early-booking-discount/contract-early-booking-discount.service';
import {ContractLongStayDiscountService} from '../contract-long-stay-discount/contract-long-stay-discount.service';
import {CreateOneContractStoreService} from '../create-one-contract-store.service';
import {HbgSelectDiscountService} from '../contract-discount/hbg-select-discount/hbg-select-discount.service';
import {NrfDiscountService} from '../contract-discount/nrf-discount/nrf-discount.service';
import {OpaqueDiscountService} from '../contract-discount/opaque-discount/opaque-discount.service';
import {filter} from 'rxjs/operators';
import {ISelectItem, ISelectOptionsComponentsTypes} from '../../../shared/types/ISelect';
import {ISvgIcons, SVG_ICONS} from '../../../shared/svg-icon-module/svg-icons.const';
import {InputUtils} from '../../../utils/input-utils';
import {DISCOUNTS_TYPES} from '../one-contract.const';
import {OPTIONS_TYPES} from '../../../shared/inputs/select-module/select-input/select-input.constant';
import {CreateOneContractService} from '../create-one-contract.service';
import {SelectInputService} from '../../../shared/services/select-input.service';
import {IOneContractParams, ISupplementCombination} from '../one-contract-object';
import {JsUtils} from '../../../utils/jsUtils';
import {IContractCombinationsPrams, IContractSelectedDiscounts} from '../one-contract';
import {ICheckboxItem} from '../../../shared/types/buttons';

@Component({
  selector: 'app-contract-combinations',
  templateUrl: './contract-combinations.component.html',
  styleUrls: ['./contract-combinations.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContractCombinationsComponent implements OnInit, OnDestroy {
  public tableHeader: string[] = ['Offer Type', 'Combination With Offer', 'Allotment', 'Total Discount', ''];
  public SVG_ICONS: ISvgIcons = SVG_ICONS;
  public OPTIONS_TYPES: ISelectOptionsComponentsTypes = OPTIONS_TYPES;
  public displayForm: boolean = false;
  private subscriptionsArray: any[] = [];
  public multipleNamesOrIdTextHandler: any = InputUtils.multipleNamesOrIdTextHandler;
  private selectedDiscounts: ISelectItem[] = [];
  public discountNameMap: any = {
    [DISCOUNTS_TYPES['NRFDiscount']]: {
      name: 'NRF',
      id: DISCOUNTS_TYPES['NRFDiscount']
    },
    [DISCOUNTS_TYPES['opaqueDiscount']]: {
      name: 'Opaque',
      id: DISCOUNTS_TYPES['opaqueDiscount']
    },
    [DISCOUNTS_TYPES['HBGSelectDiscount']]: {
      name: 'HBG Select',
      id: DISCOUNTS_TYPES['HBGSelectDiscount']
    },
    [DISCOUNTS_TYPES['earlyBookingDiscount']]: {
      name: 'Early Booking',
      id: DISCOUNTS_TYPES['earlyBookingDiscount']
    },
    [DISCOUNTS_TYPES['longStayDiscount']]: {
      name: 'Long Stay',
      id: DISCOUNTS_TYPES['longStayDiscount']
    },
    [DISCOUNTS_TYPES.freeNights]: {
      name: 'Free Nights',
      id: DISCOUNTS_TYPES.freeNights
    },
  };

  constructor(public oneContractService: CreateOneContractService,
              private selectInputService: SelectInputService,
              public contractCombinationsService: ContractCombinationsService,
              public contractEarlyBookingService: ContractEarlyBookingDiscountService,
              public contractLongStayDiscountService: ContractLongStayDiscountService,
              private oneContractStoreService: CreateOneContractStoreService,
              private hbgSelectDiscountService: HbgSelectDiscountService,
              private nrfDiscountService: NrfDiscountService, private changeDetector: ChangeDetectorRef,
              private opaqueDiscountService: OpaqueDiscountService) {
  }

  ngOnInit(): void {
    const {subscriptionsArray, oneContractStoreService, selectedDiscountsHandler} = this;
    this.subscriptionsArray.push(
      oneContractStoreService.oneContract$.pipe(filter(contract => !contract || !contract.dontUpdateView))
        .subscribe((oneContract: IOneContractParams) => {
          if (oneContract) {
            setTimeout(() => this.resetParameters(oneContract));
          }
        }));
    subscriptionsArray.push(oneContractStoreService.selectedDiscounts$.subscribe(selectedDiscountsHandler));
  }

  resetParameters = (oneContract: IOneContractParams) => {
    const supplementCombination: ISupplementCombination[] = JsUtils.deepCopy(oneContract.contractData && oneContract.contractData.supplementCombination) || [];
    this.contractCombinationsService.tableRows = [];
    if (supplementCombination.length > 0) {
      this.displayForm = true;
      for (let i = 0; i < supplementCombination.length; i++) {
        this.addRow();
        this.onSelectOfferType({name: '', id: supplementCombination[i].supplementCode}, i);
        this.selectInputService.updateIsSelected(this.contractCombinationsService.tableRows[i].offerTypesOptions, null, supplementCombination[i].supplementCode);
        this.selectInputService.updateIsSelected(this.contractCombinationsService.tableRows[i].combinationWithOfferOptions, null, supplementCombination[i].supplementCodeCombinable);
        this.onSelectAllotment({id: supplementCombination[i].sharedAllotment, name: null}, i);
        this.selectInputService.updateIsSelected(this.contractCombinationsService.tableRows[i].allotmentOptions, null, supplementCombination[i].sharedAllotment);
        supplementCombination[i].supplementCodeCombinable.forEach((supplementCode: string) => {
          this.onSelectCombinationWithOffer({name: '', id: supplementCode, isSelected: true}, i);
        });
        if (supplementCombination[i].totalDiscount[0]) {
          this.contractCombinationsService.tableRows[i].totalDiscount = supplementCombination[i].totalDiscount[0].value + '%';
          if (supplementCombination[i].totalDiscount[1]) {
            this.contractCombinationsService.tableRows[i].totalDiscount += ` - ${supplementCombination[i].totalDiscount[1].value} %`;
          }
        }
      }
    }
    setTimeout(() => this.changeDetector.detectChanges());
  };

  calculateDiscounts(discountsArray: string[], isMimimumValue: boolean = false): number {
    let result: number = 0;
    discountsArray.forEach(d => {
      //todo: reefactor code, remove switch case
      switch (d) {
        case DISCOUNTS_TYPES['NRFDiscount']:
          const nrfDiscount: number = this.calculateRangeDiscount(this.nrfDiscountService.params.discountRows, isMimimumValue);
          if (nrfDiscount !== null) {
            result += +nrfDiscount;
          }
          break;
        case DISCOUNTS_TYPES['opaqueDiscount']:
          const opaqueDiscount: number = this.calculateRangeDiscount(this.opaqueDiscountService.params.discountRows, isMimimumValue);
          if (opaqueDiscount !== null) {
            result += +opaqueDiscount;
          }
          break;
        case DISCOUNTS_TYPES['HBGSelectDiscount']:
          const hbgSelectDiscount: number = this.calculateRangeDiscount(this.hbgSelectDiscountService.params.discountRows, isMimimumValue);
          if (hbgSelectDiscount !== null) {
            result += +hbgSelectDiscount;
          }
          break;
        case DISCOUNTS_TYPES['earlyBookingDiscount']:
          const earlyBookingDiscount: number = this.calculateRangeDiscount(this.contractEarlyBookingService.earlyBookingDiscountParams, isMimimumValue);
          if (earlyBookingDiscount !== null) {
            result += earlyBookingDiscount;
          }
          break;
        case DISCOUNTS_TYPES['longStayDiscount']:
          const longStayDiscount: number = this.calculateRangeDiscount(this.contractLongStayDiscountService.contractLongStayDiscountParams, isMimimumValue);
          if (longStayDiscount !== null) {
            result += longStayDiscount;
          }
          break;
      }
    });
    return result;
  }

  calculateRangeDiscount(params: any, isMimimumValue: boolean): number {
    let discount: number = null;
    params.forEach((dis: any, ind: number) => {
      const parsedDiscount: number = parseFloat(dis.discount);
      if (ind === 0 && parsedDiscount >= 0) {
        discount = parseFloat(params[0].discount);
      }
      if (parsedDiscount > discount && !isMimimumValue) {
        discount = parsedDiscount;
      } else if (parsedDiscount < discount && isMimimumValue) {
        discount = parsedDiscount;
      }
    });
    if (isNaN(discount)) {
      discount = 0;
    }
    return discount;
  }

  calculateCombinationDiscount(rowNumber: number): string {
    let resultText: string = '';
    let minimumDiscount: number;
    let maximumDiscount: number;
    const {supplementCode, combinationWithOffer} = this.contractCombinationsService.tableRows[rowNumber];
    const discountsArray: string[] = [...combinationWithOffer];

    discountsArray.push(supplementCode);
    minimumDiscount = this.calculateDiscounts(discountsArray, true);
    maximumDiscount = this.calculateDiscounts(discountsArray);
    if (isNaN(minimumDiscount)) {
      minimumDiscount = 0;
    }
    if (isNaN(maximumDiscount)) {
      maximumDiscount = 0;
    }
    if (minimumDiscount === maximumDiscount) {
      resultText = `${maximumDiscount}%`;
    } else {
      resultText = `${minimumDiscount}% - ${maximumDiscount}%`;
    }
    this.contractCombinationsService.tableRows[rowNumber].totalDiscount = resultText;
    return resultText;
  }

  selectedDiscountsHandler = (newDiscountsTypes: IContractSelectedDiscounts) => {
    this.selectedDiscounts = [];
    Object.keys(newDiscountsTypes).forEach(discountKey => {
      if (newDiscountsTypes[discountKey]) {
        this.selectedDiscounts.push(JsUtils.deepCopy(this.discountNameMap[discountKey]));
      }
    });
    this.updateDiscountsOptions();
    setTimeout(() => this.changeDetector.detectChanges());
  };

  onSelectOfferType(selectedItem: ISelectItem, rowNumber: number): void {
    const oldSelection = this.contractCombinationsService.tableRows[rowNumber].supplementCode;
    this.contractCombinationsService.tableRows[rowNumber].supplementCode = selectedItem.id;
    this.contractCombinationsService.tableRows[rowNumber].combinationWithOfferOptions = this.selectInputService.removeItemsFromList(this.contractCombinationsService.tableRows[rowNumber].combinationWithOfferOptions, null, selectedItem.id);
    this.contractCombinationsService.tableRows[rowNumber].combinationWithOffer = this.contractCombinationsService.tableRows[rowNumber].combinationWithOffer.filter(combinationWithOffer => combinationWithOffer !== selectedItem.id);
    if (JsUtils.isDefineAndNotNull(oldSelection) && oldSelection && oldSelection !== selectedItem.id) {
      const newOption = JsUtils.deepCopy(this.discountNameMap[oldSelection]);
      this.contractCombinationsService.tableRows[rowNumber].combinationWithOfferOptions.push(newOption);
    }
    if (selectedItem.id === null) {
      delete this.contractCombinationsService.tableRows[rowNumber].supplementCode;
    }
  }

  onSelectCombinationWithOffer(selectedItem: ISelectItem, rowNumber: number): void {
    if (selectedItem.isSelected) {
      this.contractCombinationsService.tableRows[rowNumber].combinationWithOffer.push(selectedItem.id);
    } else {
      const indexToRemove = this.contractCombinationsService.tableRows[rowNumber].combinationWithOffer.indexOf(selectedItem.id);
      this.contractCombinationsService.tableRows[rowNumber].combinationWithOffer.splice(indexToRemove, 1);
    }
  }

  onSelectAllotment(selectedItem: ISelectItem, rowNumber: number): void {
    this.contractCombinationsService.tableRows[rowNumber].allotment = selectedItem.id;
  }

  updateDiscountsOptions(): void {
    this.contractCombinationsService.tableRows.forEach(row => {
      row.offerTypesOptions = JsUtils.deepCopy(this.selectedDiscounts);
      row.combinationWithOfferOptions = JsUtils.deepCopy(this.selectedDiscounts);
    });
    this.contractCombinationsService.tableRows.forEach((params: IContractCombinationsPrams, index: number) => {
      if (!this.selectInputService.isContains(this.selectedDiscounts, null, params.supplementCode)) {
        params.supplementCode = '';
      }
      params.combinationWithOffer = params.combinationWithOffer.filter(combinationWithOffer => {
        return this.selectInputService.isContains(this.selectedDiscounts, null, combinationWithOffer);
      });
      this.selectInputService.updateIsSelected(this.contractCombinationsService.tableRows[index].combinationWithOfferOptions, null, params.combinationWithOffer);
      this.contractCombinationsService.tableRows[index].combinationWithOfferOptions = [...this.contractCombinationsService.tableRows[index].combinationWithOfferOptions];
    });

    this.contractCombinationsService.tableRows.forEach((params: IContractCombinationsPrams, rowNumber: number) => {
      if (params.supplementCode) {
        this.selectInputService.updateIsSelected(this.contractCombinationsService.tableRows[rowNumber].offerTypesOptions, null, params.supplementCode);
        this.contractCombinationsService.tableRows[rowNumber].combinationWithOfferOptions = this.selectInputService.removeItemsFromList(this.contractCombinationsService.tableRows[rowNumber].combinationWithOfferOptions, null, params.supplementCode);
      }
    });
  }

  addRow(): void {
    this.contractCombinationsService.tableRows.push(<IContractCombinationsPrams>{
      offerTypesOptions: JsUtils.deepCopy(this.selectedDiscounts),
      combinationWithOfferOptions: JsUtils.deepCopy(this.selectedDiscounts),
      allotmentOptions: this.oneContractService.getAllotmentOptions(),
      combinationWithOffer: [],
      allotment: true,
      offerType: null,
      supplementCode: null,
      totalDiscount: null
    });
  }

  selectAllHandler = (rowNumber: number) => (list: ISelectItem[], allOptionsItem: ICheckboxItem) => {
    allOptionsItem.isSelected = true;
    list.forEach(option => option.isSelected = true);
    this.contractCombinationsService.tableRows[rowNumber].combinationWithOffer = [];
    this.contractCombinationsService.tableRows[rowNumber].combinationWithOfferOptions.forEach(option => {
      this.contractCombinationsService.tableRows[rowNumber].combinationWithOffer.push(option.id);
    });
  };

  getSelectAllConfig(rowNumber: number): any {
    return {selectAllConfig: {selectAllHandler: this.selectAllHandler(rowNumber)}};
  }

  deleteRow(index: number): void {
    this.contractCombinationsService.tableRows.splice(index, 1);
  }

  ngOnDestroy(): void {
    this.subscriptionsArray.forEach(subscription => subscription.unsubscribe());
    this.selectedDiscounts = [];
    this.contractCombinationsService.resetParams();
  }
}

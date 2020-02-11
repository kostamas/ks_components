import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import {ContractDetailsService} from './contract-details.service';
import {AppCommonService} from '../../../../app-common.service';
import * as moment from 'moment';
import {Subject} from 'rxjs';
import {CreateOneContractStoreService} from '../create-one-contract-store.service';
import {CreateOneContractService} from '../create-one-contract.service';
import {filter} from 'rxjs/operators';
import {ISvgIcons, SVG_ICONS} from '../../../shared/svg-icon-module/svg-icons.const';
import {ISelectItem, IValidationStatus} from '../../../shared/types/ISelect';
import {SelectInputService} from '../../../shared/services/select-input.service';
import {OneContractService} from '../one-contract-service';
import {JsUtils} from '../../../utils/jsUtils';
import {ALL_OPTION} from '../../../shared/inputs/select-module/select-input/select-input.constant';
import {INameId, IOneContractParams} from '../one-contract-object';
import {IRadioButton} from '../../../shared/types/buttons';
import {currencies} from '../currencies.constant';
import {DATE_FORMAT} from '../../../shared/calendar-module/calendar.const';

@Component({
  selector: 'app-contract-details',
  templateUrl: './contract-details.component.html',
  styleUrls: ['./contract-details.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContractDetailsComponent implements OnInit, OnDestroy {
  public SVG_ICONS: ISvgIcons = SVG_ICONS;
  public calendarFromDate: string;
  public isIncludedCountriesDisabled: boolean = false;
  public isExcludeCountriesDisabled: boolean = false;
  public boardBasisOptions: any[] = [];
  public subscriptionArr: any[] = [];
  public classificationOptions: ISelectItem[] = [];
  public excludedCountriesOptions: ISelectItem[] = [];
  public contractTypeOptions: ISelectItem[] = [];
  public paymentModeOptions: ISelectItem[] = [];
  public visibleSwsOptions: ISelectItem[] = [];
  public managedByOptions: ISelectItem[] = [];
  public includedCountriesOptions: ISelectItem[] = [];
  public countriesOptions: ISelectItem[] = [];
  public currencyOptions: ISelectItem[];
  public rspOptions: ISelectItem[] = [];
  public contractBoardBasisStatus$: Subject<IValidationStatus> = new Subject<IValidationStatus>();
  public contractClassificationStatus$: Subject<IValidationStatus> = new Subject<IValidationStatus>();
  public contractManagedByStatus$: Subject<IValidationStatus> = new Subject<IValidationStatus>();
  public contractVisibleSWSStatus$: Subject<IValidationStatus> = new Subject<IValidationStatus>();
  public contractCurrencyStatus$: Subject<IValidationStatus> = new Subject<IValidationStatus>();

  constructor(private oneContractService: OneContractService, public contractDetailsService: ContractDetailsService,
              public appCommonService: AppCommonService, private selectInputService: SelectInputService,
              private oneContractStoreService: CreateOneContractStoreService,
              public createOneContractService: CreateOneContractService,
              private changeDetector: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.initializeParams();
    this.subscriptionArr.push(
      this.oneContractStoreService.oneContract$
        .pipe(filter(contract => !contract || !contract.dontUpdateView))
        .subscribe(this.resetParameters));
  }

  initializeParams(): void {
    this.contractTypeOptions = this.contractDetailsService.getContractTypeOptions();
    this.rspOptions = this.contractDetailsService.getYesNoOptions();
    this.currencyOptions = this.contractDetailsService.getCurrencyOptions();
    this.boardBasisOptions = this.contractDetailsService.getBoardBasisOptions();
    this.paymentModeOptions = this.contractDetailsService.getPaymentModeOptions();
    this.classificationOptions = this.contractDetailsService.getClassificationOptions();
    this.managedByOptions = this.contractDetailsService.getManagedByOptions();
    this.visibleSwsOptions = this.contractDetailsService.getYesNoOptions(true);
    this.contractDetailsService.contractDetailsParams.commissionPercentage = null;

    this.oneContractService.countries$.subscribe((countries: ISelectItem[]) => {
      if (countries) {
        this.excludedCountriesOptions = JsUtils.deepCopy(countries);
        this.includedCountriesOptions = JsUtils.deepCopy(countries);
        this.countriesOptions = JsUtils.deepCopy(countries);
        this.onSelectCountries(Object.assign({}, ALL_OPTION, {withoutChips: true}), 'includedCountries');
        setTimeout(() => this.changeDetector.detectChanges());
      }
    });

    const selectedContractType: ISelectItem = <ISelectItem>this.selectInputService.getSelectedItem(this.contractTypeOptions);
    this.onSelectMarketDistribution(selectedContractType);
    const selectedBoardBasis: any = <ISelectItem>this.selectInputService.getSelectedItem(this.boardBasisOptions);
    if (JsUtils.isDefined(selectedBoardBasis)) {
      this.onSelectOption(selectedBoardBasis, 'boardBase', selectedBoardBasis.name);
    }
    const selectedRspOption: ISelectItem = <ISelectItem>this.selectInputService.getSelectedItem(this.rspOptions);
    if (JsUtils.isDefined(selectedRspOption)) {
      this.onSelectOption(selectedRspOption, 'recommendedSellingPrice');
    }
    const selectedPaymentMode: ISelectItem = <ISelectItem>this.selectInputService.getSelectedItem(this.paymentModeOptions);
    if (JsUtils.isDefined(selectedPaymentMode)) {
      this.onSelectOption(selectedPaymentMode, 'selectedPaymentMode');
    }
    const selectedClassification: any = <ISelectItem>this.selectInputService.getSelectedItem(this.classificationOptions);
    if (JsUtils.isDefined(selectedClassification)) {
      this.onSelectOption(selectedClassification, 'classification');
    }
    const selectedCurrency: ISelectItem = <ISelectItem>this.selectInputService.getSelectedItem(this.currencyOptions);
    if (JsUtils.isDefineAndNotNull(selectedCurrency)) {
      this.onSelectOption(selectedCurrency ? selectedCurrency : null, 'currency', selectedCurrency ? selectedCurrency.id : '');
    }
    const selectedManagedBy: ISelectItem = <ISelectItem>this.selectInputService.getSelectedItem((this.managedByOptions));
    if (JsUtils.isDefined(selectedManagedBy)) {
      this.onSelectOption(selectedManagedBy, 'managementType');
    }
    const selectedVisibleSWS: ISelectItem = <ISelectItem>this.selectInputService.getSelectedItem(this.visibleSwsOptions);
    if (JsUtils.isDefined(selectedVisibleSWS)) {
      this.onSelectOption(selectedVisibleSWS, 'isVisibleWeb');
    }
    this.calendarFromDate = moment().format(DATE_FORMAT);
  }

  resetParameters = (oneContract: IOneContractParams): void => {

    this.initializeParams();
    this.contractDetailsService.contractDetailsParams.currency = <INameId>{id: null, name: null};
    if (oneContract) {
      this.contractDetailsService.contractDetailsParams = JsUtils.deepCopy(oneContract.contractData.contractHeader);
      const {
        contractTypeOptions, paymentModeOptions, boardBasisOptions, rspOptions, managedByOptions, classificationOptions,
        visibleSwsOptions
      } = this;
      this.selectInputService.updateIsSelected(contractTypeOptions, null, this.contractDetailsService.contractDetailsParams.contractType);
      this.contractTypeOptions = [...this.contractTypeOptions];

      this.onSelectMarketDistribution(<ISelectItem>this.selectInputService.getSelectedItem(this.contractTypeOptions));

      if (this.contractDetailsService.contractDetailsParams.contractType === 'BR') {
        this.selectInputService.updateIsSelected(rspOptions, null, this.contractDetailsService.contractDetailsParams.recommendedSellingPrice);
        this.rspOptions = [...rspOptions];
      }

      this.selectInputService.updateIsSelected(boardBasisOptions, null, this.contractDetailsService.contractDetailsParams.boardBase.id);
      this.boardBasisOptions = [...boardBasisOptions];

      this.selectInputService.updateIsSelected(paymentModeOptions, null, this.contractDetailsService.contractDetailsParams.paymentMode);
      this.paymentModeOptions = [...paymentModeOptions];

      this.selectInputService.updateIsSelected(classificationOptions, null, this.contractDetailsService.contractDetailsParams.classification);
      this.classificationOptions = [...classificationOptions];

      if (oneContract.contractData.contractHeader.currency && oneContract.contractData.contractHeader.currency.id) {
        this.selectInputService.updateIsSelected(this.currencyOptions, null, oneContract.contractData.contractHeader.currency.id);
        this.currencyOptions = [...this.currencyOptions];
        this.onSelectOption({
          id: oneContract.contractData.contractHeader.currency.id,
          name: ''
        }, 'currency', oneContract.contractData.contractHeader.currency.id);
      } else {
        this.oneContractStoreService.selectedCurrency$.next('');
      }
      this.selectInputService.updateIsSelected(managedByOptions, null, this.contractDetailsService.contractDetailsParams.managementType);
      this.managedByOptions = [...managedByOptions];
      this.onSelectOption(<ISelectItem>this.selectInputService.getSelectedItem(this.managedByOptions), 'managementType');

      this.selectInputService.updateIsSelected(visibleSwsOptions, null, this.contractDetailsService.contractDetailsParams.isVisibleWeb);
      this.visibleSwsOptions = [...visibleSwsOptions];

      const includedCountries = this.contractDetailsService.contractDetailsParams.includedCountries;
      if (includedCountries && includedCountries.length > 0 && includedCountries[0].id !== 'All') {
        this.isExcludeCountriesDisabled = true;
        includedCountries.forEach((includedCountry: ISelectItem) => {
          this.includedCountriesOptions = this.includedCountriesOptions.filter((country: ISelectItem) => country.id !== includedCountry.id);
        });
      } else {
        if (!includedCountries) {
          this.contractDetailsService.contractDetailsParams.includedCountries = [Object.assign({}, ALL_OPTION, {withoutChips: true})];
        }
      }

      const excludedCountries = this.contractDetailsService.contractDetailsParams.excludedCountries;
      if (excludedCountries && excludedCountries.length > 0) {
        this.isIncludedCountriesDisabled = true;
        excludedCountries.forEach((excludedCountry: ISelectItem) => {
          this.excludedCountriesOptions = this.excludedCountriesOptions.filter((country: ISelectItem) => country.id !== excludedCountry.id);
        });
      } else {
        this.contractDetailsService.contractDetailsParams.excludedCountries = [];
      }
    }

    setTimeout(() => this.changeDetector.detectChanges());
  };

  radioButtonClick(radioButton: IRadioButton): void {
    this.contractDetailsService.contractDetailsParams.isVisibleWeb = radioButton.id;
  }

  onSelectMarketDistribution(marketDistribution: ISelectItem): void {
    this.contractDetailsService.contractDetailsParams.contractType = marketDistribution.id;
    if (this.contractDetailsService.contractDetailsParams.contractType === 'FN') {
      this.contractDetailsService.contractDetailsParams.commissionPercentage = null;
      this.rspOptions = this.contractDetailsService.getYesNoOptions();
      this.paymentModeOptions = [{name: 'MERCHANT', id: 'M', isSelected: true}];
      this.contractDetailsService.contractDetailsParams.paymentMode = 'M';
    } else {
      this.paymentModeOptions = this.contractDetailsService.getPaymentModeOptions();
    }
  }

  onSelectOption(selectedItem: any, key: string, nameValue: string = null): void {
    if (!JsUtils.isDefineAndNotNull(nameValue)) {
      this.contractDetailsService.contractDetailsParams[key] = selectedItem.id;
    } else {
      this.contractDetailsService.contractDetailsParams[key].id = selectedItem.id;
      this.contractDetailsService.contractDetailsParams[key].name = nameValue;
    }
    if (key === 'currency') {
      const currency = currencies[selectedItem.id] && currencies[selectedItem.id].symbol || '';
      if (!this.contractDetailsService.contractDetailsParams.currency) {
        this.contractDetailsService.contractDetailsParams.currency = <INameId>{};
      }
      this.contractDetailsService.contractDetailsParams.currency.name = null;
      this.oneContractStoreService.selectedCurrency$.next(currency);
    }
    if (key === 'managementType') {
      const isVisible: boolean = selectedItem.id === 'Hotel' || selectedItem.id === 'HSI';
      this.selectInputService.updateIsSelected(this.visibleSwsOptions, null, isVisible);
      this.visibleSwsOptions = [...this.visibleSwsOptions];
      this.contractDetailsService.contractDetailsParams.isVisibleWeb = isVisible;
    }
    if (key === 'classification') {
      this.oneContractStoreService.classification$.next(selectedItem.id);
    }
  }

  onSelectCountries(selectedItem: any, key: string): void {
    if (key === 'includedCountries') {
      if (selectedItem.id === 'All') {
        this.contractDetailsService.contractDetailsParams.includedCountries = [selectedItem];
        this.includedCountriesOptions = JsUtils.deepCopy(this.countriesOptions);
        this.includedCountriesOptions = this.selectInputService.removeItemsFromList(this.includedCountriesOptions, null, 'All');
        this.isExcludeCountriesDisabled = false;
      } else {
        let indexToDelete = -1;
        this.contractDetailsService.contractDetailsParams.includedCountries.forEach((option: ISelectItem, index: number) => {
          if (option.id === 'All') {
            indexToDelete = index;
          }
        });
        if (indexToDelete > -1) {
          this.contractDetailsService.contractDetailsParams.includedCountries.splice(indexToDelete, 1);
        }
        this.includedCountriesOptions = this.includedCountriesOptions.filter((country: ISelectItem) => country.id !== selectedItem.id);
        this.contractDetailsService.contractDetailsParams.excludedCountries = [];
        this.isExcludeCountriesDisabled = true;
      }
    }
    if (key === 'excludedCountries') {
      this.isIncludedCountriesDisabled = true;
      this.excludedCountriesOptions = this.excludedCountriesOptions.filter((country: ISelectItem) => country.id !== selectedItem.id);
      this.contractDetailsService.contractDetailsParams.includedCountries = [Object.assign({}, ALL_OPTION, {withoutChips: true})];
    }
  }

  onDeleteChips(selectedItem: any, key: string): void {
    if (key === 'includedCountries') {
      const includedCountries = this.contractDetailsService.contractDetailsParams.includedCountries;
      if (includedCountries.length === 0 || includedCountries.length === 1 && includedCountries[0].id === 'All') {
        this.isExcludeCountriesDisabled = false;
        if (includedCountries.length === 0) {
          this.contractDetailsService.contractDetailsParams.includedCountries = [Object.assign({}, ALL_OPTION, {withoutChips: true})];
        }
      }

      this.includedCountriesOptions.push(selectedItem);
      this.includedCountriesOptions.sort((n1, n2) => JsUtils.sortByNames(n1.name, n2.name));
    }

    if (key === 'excludedCountries') {
      const excludedCountries = this.contractDetailsService.contractDetailsParams.excludedCountries;
      if (excludedCountries.length === 0 || excludedCountries.length === 1 && excludedCountries[0].id === 'All') {
        this.isIncludedCountriesDisabled = false;
      }
      this.excludedCountriesOptions.push(selectedItem);
      this.excludedCountriesOptions.sort((n1, n2) => JsUtils.sortByNames(n1.name, n2.name));
    }
  }

  onIncludedCountriesFocus(): void {
    const includedCountries = this.contractDetailsService.contractDetailsParams.includedCountries;
    if (includedCountries && includedCountries[0] && includedCountries[0].id === ALL_OPTION.id) {
      this.contractDetailsService.contractDetailsParams.includedCountries = [];
      this.includedCountriesOptions = JsUtils.deepCopy(this.countriesOptions);
    }
  }

  onIncludedCountriesBlur(): void {
    const includedCountries = this.contractDetailsService.contractDetailsParams.includedCountries;
    if (includedCountries && includedCountries.length === 0) {
      this.contractDetailsService.contractDetailsParams.includedCountries = [Object.assign({}, ALL_OPTION, {withoutChips: true})];
      this.includedCountriesOptions = JsUtils.deepCopy(this.countriesOptions);
    }
  }

  ngOnDestroy(): void {
    this.subscriptionArr.forEach((subscription: any) => subscription.unsubscribe());
    this.contractDetailsService.resetParams();
  }
}

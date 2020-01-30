import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import {ContractLoadingInformationService} from './contract-loading-information.service';
import {Subject} from 'rxjs';
import {CreateOneContractService} from '../create-one-contract.service';
import {AppCommonService} from '../../../../app-common.service';
import {CreateOneContractStoreService} from '../create-one-contract-store.service';
import {filter} from 'rxjs/operators';
import {ISelectItem, ISelectOptionsComponentsTypes, IValidationStatus} from '../../../shared/types/ISelect';
import {SelectInputService} from '../../../shared/services/select-input.service';
import {ISvgIcons, SVG_ICONS} from '../../../shared/svg-icon-module/svg-icons.const';
import {JsUtils} from '../../../utils/jsUtils';
import {IOneContractParams, ISupplier} from '../one-contract-object';
import {OPTIONS_TYPES} from '../../../shared/inputs/select-module/select-input/select-input.constant';

@Component({
  selector: 'app-contract-loading-information',
  templateUrl: './contract-loading-information.component.html',
  styleUrls: ['./contract-loading-information.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContractLoadingInformationComponent implements OnInit, OnDestroy {
  public typeOptions: ISelectItem[] = [];
  public fromAgeOptions: ISelectItem[] = [];
  public toAgeOptions: ISelectItem[] = [];
  public clientDistributionTypeOptions: ISelectItem[] = [];
  public subscriptionArr: any[] = [];

  public SVG_ICONS: ISvgIcons = SVG_ICONS;
  public OPTIONS_TYPES: ISelectOptionsComponentsTypes = OPTIONS_TYPES;
  childTooltipText: string = `<div>Guest under the minimum child age will be considered as infant.\n</div>
		<div>Guest between the child age range will be considered as child.\n</div>
		<div>Guest over the maximal child age will be considered as adult.\n</div>`;

  public contractFromAgeStatus$: Subject<IValidationStatus> = new Subject<IValidationStatus>();
  public contractToAgeStatus$: Subject<IValidationStatus> = new Subject<IValidationStatus>();

  constructor(public contractLoadingInformationService: ContractLoadingInformationService,
              public oneContractService: CreateOneContractService, private selectInputService: SelectInputService,
              public appCommonService: AppCommonService, private changeDetector: ChangeDetectorRef,
              private oneContractStoreService: CreateOneContractStoreService) {
  }

  ngOnInit(): void {
    this.initializeParams();
    this.subscriptionArr.push(
      this.oneContractStoreService.oneContract$
        .pipe(filter(contract => !contract || !contract.dontUpdateView))
        .subscribe(this.resetParams));
  }

  initializeParams(): void {
    this.contractFromAgeStatus$.next({isValid: true, message: ''});
    this.contractToAgeStatus$.next({isValid: true, message: ''});
    this.typeOptions = this.contractLoadingInformationService.getTypeOptions();
    const selectedType: ISelectItem = <ISelectItem>this.selectInputService.getSelectedItem(this.typeOptions);
    if (JsUtils.isDefineAndNotNull(selectedType)) {
      this.onSelectOption(selectedType, 'renewalType');
    }
    this.fromAgeOptions = this.contractLoadingInformationService.getAgesRangeOptions(0, this.contractLoadingInformationService.CHILD_MAX_AGE, -1);
    const selectedFromAge: ISelectItem = <ISelectItem>this.selectInputService.getSelectedItem(this.fromAgeOptions);
    if (JsUtils.isDefineAndNotNull(selectedFromAge)) {
      this.onSelectOption(selectedFromAge, 'minimumAge');
    }
    this.toAgeOptions = this.contractLoadingInformationService.getAgesRangeOptions(0, this.contractLoadingInformationService.CHILD_MAX_AGE, -1);
    const selectedToAge: ISelectItem = <ISelectItem>this.selectInputService.getSelectedItem(this.toAgeOptions);
    if (JsUtils.isDefineAndNotNull(selectedToAge)) {
      this.onSelectOption(selectedToAge, 'maximumAge');
    }
    this.clientDistributionTypeOptions = this.contractLoadingInformationService.getClientDistributionTypeOptions();
    const selectedClientDistType: ISelectItem = <ISelectItem>this.selectInputService.getSelectedItem(this.clientDistributionTypeOptions);
    if (JsUtils.isDefineAndNotNull(selectedClientDistType)) {
      this.onSelectOption(selectedClientDistType, 'clientDistributionType');
    }
  }

  resetParams = (oneContract: IOneContractParams): void => {
    this.contractLoadingInformationService.resetParams();
    this.initializeParams();
    if (oneContract) {
      this.contractLoadingInformationService.contractLoadingInformationParams = JsUtils.deepCopy(<any>oneContract.contractData.contractHeader);
      if (!this.contractLoadingInformationService.contractLoadingInformationParams.supplier) {
        this.contractLoadingInformationService.contractLoadingInformationParams.supplier = <ISupplier>{};
      }
      const {renewalType, childAges, clientDistributionType} = this.contractLoadingInformationService.contractLoadingInformationParams;
      this.contractLoadingInformationService.contractLoadingInformationParams.supplier = oneContract.contractData.contractHeader.supplier;
      this.selectInputService.updateIsSelected(this.typeOptions, null, renewalType);
      if (JsUtils.isDefined(childAges.minimumAge)) {
        this.selectInputService.updateIsSelected(this.fromAgeOptions, null, childAges.minimumAge);
      }
      if (JsUtils.isDefined(childAges.maximumAge)) {
        this.selectInputService.updateIsSelected(this.toAgeOptions, null, childAges.maximumAge);
      }
      this.selectInputService.updateIsSelected(this.toAgeOptions, null, childAges.maximumAge);
      this.selectInputService.updateIsSelected(this.clientDistributionTypeOptions, null, clientDistributionType);
      this.typeOptions = [...this.typeOptions];
      this.fromAgeOptions = [...this.fromAgeOptions];
      this.toAgeOptions = [...this.toAgeOptions];
      this.clientDistributionTypeOptions = [...this.clientDistributionTypeOptions];
    }
    setTimeout(() => this.changeDetector.detectChanges());
  };

  onSelectOption(selectedItem: any, key: string, nameValue: string = null): void {
    if (key !== 'minimumAge' && key !== 'maximumAge') {
      if (!JsUtils.isDefineAndNotNull(nameValue)) {
        this.contractLoadingInformationService.contractLoadingInformationParams[key] = selectedItem.id;
      } else {
        this.contractLoadingInformationService.contractLoadingInformationParams[key].id = selectedItem.id;
        this.contractLoadingInformationService.contractLoadingInformationParams[key].name = nameValue;
      }
    }
    if (key === 'minimumAge' || key === 'maximumAge') {
      this.contractLoadingInformationService.contractLoadingInformationParams.childAges[key] = selectedItem.id;
      if (key === 'minimumAge') {
        if (selectedItem.id <= this.contractLoadingInformationService.CHILD_MAX_AGE) {
          this.toAgeOptions = this.contractLoadingInformationService.getAgesRangeOptions(selectedItem.id, this.contractLoadingInformationService.CHILD_MAX_AGE, -1);
          this.contractLoadingInformationService.contractLoadingInformationParams.childAges.maximumAge = null;
        }
      }
    }
  }

  isWithEmptyOption(key: string): boolean {
    return this.contractLoadingInformationService.contractLoadingInformationParams.childAges[key] || +this.contractLoadingInformationService.contractLoadingInformationParams.childAges[key] === 0;
  }

  ngOnDestroy(): void {
    this.contractLoadingInformationService.resetParams();
    this.subscriptionArr.forEach((subscription: any) => subscription.unsubscribe());
  }
}

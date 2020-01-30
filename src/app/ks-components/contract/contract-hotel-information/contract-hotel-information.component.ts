import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import {ContractHotelInformationService} from './contract-hotel-information.service';
import {AppCommonService} from '../../../../app-common.service';
import {Observable, Subject} from 'rxjs';
import {CreateOneContractStoreService} from '../create-one-contract-store.service';
import {filter} from 'rxjs/operators';
import {IRadioButton} from '../../../shared/types/buttons';
import {ISvgIcons, SVG_ICONS} from '../../../shared/svg-icon-module/svg-icons.const';
import {ISelectItem, ISelectOptionsComponentsTypes} from '../../../shared/types/ISelect';
import {OPTIONS_TYPES} from '../../../shared/inputs/select-module/select-input/select-input.constant';
import {IModal} from '../../../shared/types/modal';
import {InputUtils} from '../../../utils/input-utils';
import {OneContractService} from '../one-contract-service';
import {ModalService} from '../../../shared/modal-module/modal.service';
import {SelectInputService} from '../../../shared/services/select-input.service';
import {INameId, IOneContractParams} from '../one-contract-object';
import {JsUtils} from '../../../utils/jsUtils';

@Component({
  selector: 'app-contract-hotel-information',
  templateUrl: './contract-hotel-information.component.html',
  styleUrls: ['./contract-hotel-information.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContractHotelInformationComponent implements OnInit, OnDestroy {
  hotelInformationRadioOptions: IRadioButton[] = [{id: 'exist', text: 'Existing Hotel', isSelected: true}, {
    id: 'new',
    text: 'New Hotel',
    isSelected: false
  }];

  SVG_ICONS: ISvgIcons = SVG_ICONS;
  hotelCodeSearch$: Subject<string> = new Subject<string>();
  validationHotelCodeStatus$: Subject<any> = new Subject<any>();
  OPTIONS_TYPES: ISelectOptionsComponentsTypes = OPTIONS_TYPES;
  companyOptions: ISelectItem[] = [];
  officesOptions: ISelectItem[] = [];
  hotelTempValue: any;
  countriesOptions: ISelectItem[] = [];
  isDirty: any = {totalRoomNumber: false};
  subscriptionArr: any[] = [];
  modal: IModal;
  isRangeValue: any = InputUtils.isRangeValue;
  preventPasteValue: any = InputUtils.preventPasteValue;
  autoSuggestFilterFunction: (option: ISelectItem, inputValue: string) => boolean;

  loadContractDetailsTooltipInfo: string = `<div>To save you some time, selecting an Atlas contract from the list will
		populate information to the following sections of the One-contract request:</div>
		<ul>
		    <li class="" style="margin-bottom: 5px;">Contract Information</li>
		    <li style="margin-bottom: 5px;">Loading Information</li>
		    <li style="margin-bottom: 5px;">Rooms List.</li>
		</ul>
		Note: the selection will override the previously entered information`;

  constructor(public contractHotelInformationService: ContractHotelInformationService,
              public appCommonService: AppCommonService, public modalService: ModalService,
              public oneContractService: OneContractService, private selectInputService: SelectInputService,
              private oneContractStoreService: CreateOneContractStoreService, private changeDetector: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.initializeParams(null);
    this.subscriptionArr.push(
      this.oneContractStoreService.oneContract$
        .pipe(filter(contract => !contract || !contract.dontUpdateView))
        .subscribe(this.resetParameters));

    this.autoSuggestFilterFunction = (option: ISelectItem, inputValue: string) => {
      const text = option.id ? option.name + ` (${option.id})` : option.name;
      return text.toLowerCase().indexOf(inputValue.toLowerCase()) > -1;
    };
  }

  initializeParams(oneContract: IOneContractParams): void {
    const company: INameId = oneContract && oneContract.company ? {
      id: oneContract.company.id,
      name: oneContract.company.name
    } : null;
    const office: INameId = oneContract && oneContract.office ? {
      id: oneContract.office.id,
      name: oneContract.office.name
    } : null;
    const country: INameId = oneContract && oneContract.hotelData.country ? {
      id: oneContract.hotelData.country.id,
      name: oneContract.hotelData.country.name
    } : null;
    this.hotelCodeSearch$.next('');
    this.hotelTempValue = {exist: {}, new: ''};
    this.validationHotelCodeStatus$.next({message: '', isValid: true});
    const selectedHotelInfo = <IRadioButton>this.selectInputService.getSelectedItem(<ISelectItem[]>this.hotelInformationRadioOptions, false);
    this.contractHotelInformationService.hotelInfo = selectedHotelInfo.id;
    this.selectInputService.updateIsSelected(this.hotelInformationRadioOptions, null, selectedHotelInfo.id);
    this.radioButtonClick(this.hotelInformationRadioOptions.filter(r => r.id === selectedHotelInfo.id)[0], true);
    this.hotelInformationRadioOptions = [...this.hotelInformationRadioOptions];

    this.oneContractService.companies$.subscribe((companies: ISelectItem[]) => {
      if (companies) {
        this.companyOptions = JsUtils.deepCopy(companies);
        const selectedCompany: ISelectItem = <ISelectItem>this.selectInputService.getSelectedItem(this.companyOptions);
        if (JsUtils.isDefineAndNotNull(selectedCompany) || JsUtils.isDefineAndNotNull(company)) {
          this.selectInputService.updateIsSelected(this.companyOptions, null, company.id);
          this.companyOptions = [...this.companyOptions];
          this.onSelectCompany(company ? company : selectedCompany, null, null, () => {
            const selectedOffice: ISelectItem = <ISelectItem>this.selectInputService.getSelectedItem(this.officesOptions);
            if (JsUtils.isDefineAndNotNull(selectedOffice) || JsUtils.isDefineAndNotNull(office)) {
              this.selectInputService.updateIsSelected(this.officesOptions, null, String(office.id));
              this.officesOptions = [...this.officesOptions];
              this.onSelectOption(office ? office : selectedOffice, 'office', office ? office.name : selectedOffice.name);
            }
          });
        }
      }
    });

    this.oneContractService.countries$.subscribe((countries: ISelectItem[]) => {
      if (countries) {
        this.countriesOptions = JsUtils.deepCopy(countries).sort((n1, n2) => JsUtils.sortByNames(n1.name, n2.name));
        const selectedCountry: ISelectItem = <ISelectItem>this.selectInputService.getSelectedItem(this.countriesOptions);
        if (JsUtils.isDefineAndNotNull(selectedCountry) || JsUtils.isDefineAndNotNull(country)) {
          this.onSelectOption(country ? country : selectedCountry, 'country');
        }
      }
    });
  }

  resetParameters = (oneContract: IOneContractParams): void => {
    this.initializeParams(oneContract);
    if (oneContract) {
      this.hotelTempValue = {exist: {}, new: ''};
      this.contractHotelInformationService.oneContractParams.company = JsUtils.deepCopy(oneContract.company);
      this.contractHotelInformationService.oneContractParams.office = JsUtils.deepCopy(oneContract.office);
      this.contractHotelInformationService.oneContractParams.hotelData = JsUtils.deepCopy(oneContract.hotelData);

      const {oneContractParams} = this.contractHotelInformationService;

      if (!JsUtils.isDefineAndNotNull(oneContractParams.hotelData.zone)) {
        oneContractParams.hotelData.zone = <INameId>{};
      }
      if (!JsUtils.isDefineAndNotNull(oneContractParams.hotelData.destination)) {
        oneContractParams.hotelData.destination = <INameId>{};
      }
      if (!JsUtils.isDefineAndNotNull(oneContractParams.company)) {
        oneContractParams.company = <INameId>{};
      }
      if (!JsUtils.isDefineAndNotNull(oneContractParams.office)) {
        oneContractParams.office = <INameId>{};
      }

      let hotelInfo: string;
      const hotelName: string = oneContractParams.hotelData.hotelName;
      if (oneContractParams.hotelData.hotelId) {
        hotelInfo = 'exist';
        setTimeout(() => this.hotelCodeSearch$.next(`${oneContractParams.hotelData.hotelName} (${oneContractParams.hotelData.hotelId})`));
      } else {
        hotelInfo = 'new';
      }
      this.selectInputService.updateIsSelected(this.hotelInformationRadioOptions, null, hotelInfo);
      this.radioButtonClick(this.hotelInformationRadioOptions.filter(r => r.id === hotelInfo)[0], true);
      this.hotelInformationRadioOptions = [...this.hotelInformationRadioOptions];
      oneContractParams.hotelData.hotelName = hotelName;
      this.hotelNameHandler();
      const {country} = oneContractParams.hotelData;
      if (country) {
        this.selectInputService.updateIsSelected(this.countriesOptions, country.name);
        this.countriesOptions = [...this.countriesOptions];
        this.onSelectOption({id: country.name, name: country.name}, 'country', country.name);
      }
    }
    setTimeout(() => setTimeout(() => this.changeDetector.detectChanges()));
  };

  autoSuggestHandler(autoSuggestApi: any, searchParamProp: any, withoutActiveAndActive: boolean = false): any {
    return (searchText): Observable<any> => {
      this.contractHotelInformationService.oneContractParams[searchParamProp] = searchText;
      if (withoutActiveAndActive) {
        return this.appCommonService.autoSuggestWithoutActiveAndVisible(autoSuggestApi, searchText);
      } else {
        return this.appCommonService.autoSuggest(autoSuggestApi, searchText);
      }
    };
  }

  onSelectAutoSuggestValue(autoSuggestResult: any, searchParamProp: any, searchParamPropName: any = null): void {
    this.contractHotelInformationService.oneContractParams.hotelData[searchParamProp] = Number(autoSuggestResult.id);
    if (JsUtils.isDefineAndNotNull(searchParamPropName)) {
      this.contractHotelInformationService.oneContractParams.hotelData[searchParamPropName] = autoSuggestResult.name;
      if (searchParamPropName === 'hotelName') {
        this.hotelNameHandler();
        this.setAutomaticCompanyAndOfficeAccordingToHotel(autoSuggestResult.incomingOffices);
      }
    }
  }

  onResetHotelAutoSuggest(): void {
    this.hotelTempValue.exist.id = null;
    this.hotelTempValue.exist.name = null;
    this.contractHotelInformationService.oneContractParams.hotelData.hotelId = null;
    this.contractHotelInformationService.oneContractParams.hotelData.hotelName = null;
    this.hotelNameHandler('');
  }

  onSelectOption(selectedOption: ISelectItem, key: string, nameValue: string = null): void {
    if (key === 'office') {
      this.contractHotelInformationService.oneContractParams[key].id = selectedOption.id;
      this.contractHotelInformationService.oneContractParams[key].name = nameValue;
    } else {
      if (JsUtils.isDefineAndNotNull(nameValue)) {
        if (key === 'country') {
          selectedOption.id = null;
          if (!JsUtils.isDefineAndNotNull(this.contractHotelInformationService.oneContractParams.hotelData.country)) {
            this.contractHotelInformationService.oneContractParams.hotelData.country = <INameId>{};
          }
        }
        this.contractHotelInformationService.oneContractParams.hotelData[key].id = selectedOption.id;
        this.contractHotelInformationService.oneContractParams.hotelData[key].name = nameValue;
      } else {
        this.contractHotelInformationService.oneContractParams.hotelData[key] = selectedOption.id;
      }
    }
  }

  onSelectCompany(selectedOption: ISelectItem, officeId: string = null, officeName: string = null, officesCB?: any): void {
    this.oneContractService.getOfficesByCompany(selectedOption.id, (offices: ISelectItem[]) => {
      this.officesOptions = JsUtils.deepCopy(offices);
      if (officesCB) {
        officesCB(this.officesOptions);
      }
    });
    this.contractHotelInformationService.oneContractParams.company.id = selectedOption.id;
    this.contractHotelInformationService.oneContractParams.company.name = selectedOption.name;
    this.contractHotelInformationService.oneContractParams.office.id = officeId;
    this.contractHotelInformationService.oneContractParams.office.name = officeName;
  }

  radioButtonClick(checkedButton: IRadioButton, paramsInit: boolean = false): void {
    if (checkedButton.id !== this.contractHotelInformationService.hotelInfo) {
      const {oneContractParams} = this.contractHotelInformationService;
      this.contractHotelInformationService.hotelInfo = checkedButton.id;
      if (this.contractHotelInformationService.hotelInfo === 'new') {
        if (!paramsInit && oneContractParams.hotelData.hotelName && oneContractParams.hotelData.hotelId) {
          this.hotelTempValue.exist.id = oneContractParams.hotelData.hotelId;
          this.hotelTempValue.exist.name = oneContractParams.hotelData.hotelName;
        }
        oneContractParams.hotelData.hotelName = this.hotelTempValue.new;
        if (!JsUtils.isDefined(oneContractParams.hotelData.destination)) {
          oneContractParams.hotelData.destination = <INameId>{};
        }
        if (!JsUtils.isDefined(oneContractParams.hotelData.country)) {
          oneContractParams.hotelData.country = <INameId>{};
        }
        if (!JsUtils.isDefined(oneContractParams.hotelData.zone)) {
          oneContractParams.hotelData.zone = <INameId>{};
        }
      } else {
        if (!paramsInit) {
          this.hotelTempValue.new = oneContractParams.hotelData.hotelName;
        }
        if (this.hotelTempValue.exist.name && this.hotelTempValue.exist.id) {
          oneContractParams.hotelData.hotelId = this.hotelTempValue.exist.id;
          oneContractParams.hotelData.hotelName = this.hotelTempValue.exist.name;
          setTimeout(() => this.hotelCodeSearch$.next(`${this.hotelTempValue.exist.name} (${this.hotelTempValue.exist.id})`));
        } else {
          oneContractParams.hotelData.hotelId = null;
          oneContractParams.hotelData.hotelName = null;
        }
      }
    }
    this.hotelNameHandler();
  }

  openContractDetails(): void {
  }

  hotelNameHandler(hotelText: string = null): void {
    this.oneContractStoreService.contractHotelName$.next(JsUtils.isDefineAndNotNull(hotelText) ? hotelText : this.contractHotelInformationService.oneContractParams.hotelData.hotelName);
  }

  private setAutomaticCompanyAndOfficeAccordingToHotel(incomingOffices: any[]): void {
    if (incomingOffices.length === 1) {
      const company: ISelectItem = this.companyOptions.filter(c => incomingOffices[0].companyId === c.id)[0];
      this.selectInputService.updateIsSelected(this.companyOptions, null, company.id);
      this.companyOptions = [...this.companyOptions];
      this.onSelectCompany(company, incomingOffices[0].officeId, incomingOffices[0].name, () => {
        if (JsUtils.isDefineAndNotNull(this.officesOptions)) {
          this.selectInputService.updateIsSelected(this.officesOptions, null, incomingOffices[0].officeId);
          this.officesOptions = [...this.officesOptions];
        }
      });
    } else {
      this.onResetCompany(true);
    }
  }

  onResetCompany(isClearCompany: boolean = false): void {
    this.contractHotelInformationService.oneContractParams.company = <INameId>{};
    this.contractHotelInformationService.oneContractParams.office = <INameId>{};
    if (isClearCompany) {
      this.selectInputService.updateIsSelected(this.companyOptions, null, null);
      this.companyOptions = [...this.companyOptions];
    }
    this.officesOptions = [];
  }

  ngOnDestroy(): void {
    this.subscriptionArr.forEach((subscription: any) => subscription.unsubscribe());
    this.contractHotelInformationService.resetParams();
  }
}

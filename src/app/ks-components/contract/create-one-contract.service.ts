import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {catchError, switchMap, take, tap, timeout} from 'rxjs/operators';
import {Router} from '@angular/router';
import * as moment from 'moment';
import {CreateOneContractStoreService} from './create-one-contract-store.service';
import {AllOneContractService} from './all-one-contract.service';
import {ISelectItem, IValidationStatus} from '../../shared/types/ISelect';
import {DISCOUNTS_TYPES, SEASONS_TYPES} from './one-contract.const';
import {IToastConfig} from '../../shared/types/toast';
import {PopupService} from '../../shared/popup-module/popup.service';
import {ToastService} from '../../shared/services/toast.service';
import {SelectInputService} from '../../shared/services/select-input.service';
import {JsUtils} from '../../utils/jsUtils';
import {IContractDiscountRow, IContractSeason, ILoadOneContractResults, ISeasonParams} from './one-contract';
import {IOneContractParams} from './one-contract-object';
import {DATE_FORMAT} from '../../shared/calendar-module/calendar.const';

@Injectable()
export class CreateOneContractService {
  private boardBasisOptions: ISelectItem[] = [
    {name: 'Room Only (RO)', id: 'RO'},
    {name: 'Self-Catering (SC)', id: 'SC'},
    {name: 'Bed & Breakfast (BB)', id: 'BB'},
    {name: 'Half Board (HB)', id: 'HB'},
    {name: 'Full Board (FB)', id: 'FB'},
    {name: 'All Inclusive (AI)', id: 'all'},
  ];

  private seasonTypes: ISelectItem[] = [
    {name: 'All Days', id: SEASONS_TYPES.A, isSelected: true}, {name: 'Weekdays & Weekend', id: SEASONS_TYPES.W}
  ];
  private stayingTypes: ISelectItem[] = [
    {name: 'First Night', id: 'First night'},
    {name: 'Full Stay', id: 'Full stay'}
  ];
  private rulesOptions: ISelectItem[] = [{name: 'By Stay', id: 'STAY'}, {name: 'By Entry', id: 'ENTRY'}];
  private guestOptions: ISelectItem[] = [
    {name: 'Infant', id: 'I'}, {name: 'Child', id: 'C'}, {name: 'Adult', id: 'A'},
    {name: '1st child', id: '1C'}, {name: '2nd child', id: '2C'}, {name: '3rd child', id: '3C'},
    {name: '4th child', id: '4C'}, {name: '1st adult', id: '1A'}, {name: '2nd adult', id: '2A'},
    {name: '3rd adult', id: '3A'}, {name: '4th adult', id: '4A'}
  ];
  private periodOrSeasonallyOptions: ISelectItem[] = [{id: 'period', name: 'Contract Period', isSelected: true},
    {id: 'seasonally', name: 'Seasonally'}];
  private applicationRuleOptions: ISelectItem[] = [
    {name: 'Room and Board (%)', id: 'Room and Board (%)'},
    {name: 'Room (%)', id: 'Room (%)'},
    {name: 'Fixed Amount', id: 'Fixed Amount'},
  ];
  private contractPeriodsOptions: ISelectItem[] = [
    {name: 'Contract Period', id: 'CP', isSelected: true},
    {name: 'Seasonally', id: 'S'},
    {name: 'Specific Dates', id: 'SD'},
  ];
  private allotmentOptions: ISelectItem[] = [
    {name: 'Shared', id: true, isSelected: true},
    {name: 'Not Shared', id: false}
  ];
  private dinnerOptions: ISelectItem[] = [
    {name: 'Dinner (Compulsory)', id: 'DC'},
    {name: 'Dinner (Optional)', id: 'DO'}
  ];
  private hoursOptions: ISelectItem[] = [
    {name: '00:00', id: '00:00:00'}, {name: '01:00', id: '01:00:00'}, {name: '02:00', id: '02:00:00'},
    {name: '03:00', id: '03:00:00'}, {name: '04:00', id: '04:00:00'}, {name: '05:00', id: '05:00:00'},
    {name: '06:00', id: '06:00:00'}, {name: '07:00', id: '07:00:00'}, {name: '08:00', id: '08:00:00'},
    {name: '09:00', id: '09:00:00'}, {name: '10:00', id: '10:00:00'}, {name: '11:00', id: '11:00:00'},
    {name: '12:00', id: '12:00:00'}, {name: '13:00', id: '13:00:00'}, {name: '14:00', id: '14:00:00'},
    {name: '15:00', id: '15:00:00'}, {name: '16:00', id: '16:00:00'}, {name: '17:00', id: '17:00:00'},
    {name: '18:00', id: '18:00:00'}, {name: '19:00', id: '19:00:00'}, {name: '20:00', id: '20:00:00'},
    {name: '21:00', id: '21:00:00'}, {name: '22:00', id: '22:00:00'}, {name: '23:00', id: '23:00:00'},
  ];
  public oneContractId: string;
  private toastSuccessConfig: IToastConfig = {
    message: 'Saved Successfully',
    type: 'success',
    style: {right: '33px', top: '197px', 'min-width': '615x'}
  };
  private toastWarningConfig: IToastConfig = {
    message: 'Saved. Check the warnings',
    type: 'warning',
    style: {right: '33px', top: '197px', 'min-width': '615x'}
  };
  private toastErrorConfig: IToastConfig = {
    message: 'Unknown Error',
    type: 'error',
    style: {right: '33px', top: '197px', 'min-width': '615x'}
  };
  private periodTypeOptions: ISelectItem[] = [
    {name: 'Contract Period', id: 'CP', isSelected: true}, {name: 'Specific Dates', id: 'SD'}
  ];
  private nrfOptions: ISelectItem[] = [{name: 'Yes', id: true}, {name: 'No', id: false}];

  private typeOptions: ISelectItem[] = [{id: 'CLX', name: 'CLX Policy', isSelected: true},
    {id: 'NS', name: 'No Show'}];

  public dateKeys: string[] = ['dateFrom', 'dateTo', 'date'];

  constructor(public allOneContractService: AllOneContractService, private http: HttpClient, private popupService: PopupService,
              private toastService: ToastService, public selectInputService: SelectInputService,
              private createOneContractStoreService: CreateOneContractStoreService,
              private router: Router) {
  }


  public getBoardBasisOptions(): ISelectItem[] {
    return JsUtils.deepCopy(this.boardBasisOptions);
  }

  public getSeasonsTypes(): ISelectItem[] {
    return JsUtils.deepCopy(this.seasonTypes);
  }

  public getStayingOptions(): ISelectItem[] {
    return JsUtils.deepCopy(this.stayingTypes);
  }

  public getRulesOptions(): ISelectItem[] {
    return JsUtils.deepCopy(this.rulesOptions);
  }

  public getGuestOptions(): ISelectItem[] {
    return JsUtils.deepCopy(this.guestOptions);
  }

  public getPeriodOrSeasonallyOptions(): ISelectItem[] {
    return JsUtils.deepCopy(this.periodOrSeasonallyOptions);
  }

  public getApplicationRuleOptions(): ISelectItem[] {
    return JsUtils.deepCopy(this.applicationRuleOptions);
  }

  public getContractPeriodsOptions(): ISelectItem[] {
    return JsUtils.deepCopy(this.contractPeriodsOptions);
  }

  public getAllotmentOptions(): ISelectItem[] {
    return JsUtils.deepCopy(this.allotmentOptions);
  }

  public getDinnerOptions(): ISelectItem[] {
    return JsUtils.deepCopy(this.dinnerOptions);
  }

  public getHoursOptions(): ISelectItem[] {
    return JsUtils.deepCopy(this.hoursOptions);
  }

  public getNrfOptions(): ISelectItem[] {
    return JsUtils.deepCopy(this.nrfOptions);
  }

  public getPeriodTypeOptions(): ISelectItem[] {
    return JsUtils.deepCopy(this.periodTypeOptions);
  }

  public getTypeOptions(): ISelectItem[] {
    return JsUtils.deepCopy(this.typeOptions);
  }

  public numberOnly(event: any): boolean { // todo - move to shared
    const charCode = event.which ? event.which : event.keyCode;

    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  getSeasonHeader(ind: number, seasonType: string = null): string {
    let seasonText: string = `Season ${JsUtils.numberToLatter(ind, true)}`;
    if (seasonType !== null) {
      seasonText += ` (${seasonType})`;
    }
    return seasonText;
  }

  buildSeasonallyTooltip(ind: number, seasons: IContractSeason[], seasonPart: string = null): string {
    return `<div>${this.getSeasonHeader(ind + 1)} ${JsUtils.isDefineAndNotNull(seasonPart) ? `(${seasonPart})` : ``}</div>
							<div>Start Date: ${seasons[ind].seasonRange.from !== '' ? seasons[ind].seasonRange.from : 'undefined'} </div>
						<div>End Date: ${seasons[ind].seasonRange.to !== '' ? seasons[ind].seasonRange.to : 'undefined'} </div>`;
  }

  setSeasonallyTooltipValues(seasonParams: ISeasonParams, seasons: IContractSeason[], ind: number): void {
    seasonParams.tooltip = seasons[ind].selectedSeasonType === 'A' ? this.buildSeasonallyTooltip(ind, seasons) : '';
    seasonParams.tooltipWkdy = seasons[ind].selectedSeasonType === 'W' ? this.buildSeasonallyTooltip(ind, seasons, 'Weekdays') : '';
    seasonParams.tooltipWknd = seasons[ind].selectedSeasonType === 'W' ? this.buildSeasonallyTooltip(ind, seasons, 'Weekend') : '';
  }

  onOptionsClosedRequiredValidation(validationStatus: Subject<IValidationStatus>, params: any, paramsKey: string): void {
    let isValid: boolean = true;
    if (JsUtils.isDefineAndNotNull(params[paramsKey])) {
      if (JsUtils.isDefined(params[paramsKey].id) && params[paramsKey].id === null) {
        isValid = false;
      }
    } else {
      isValid = false;
    }
    validationStatus.next({message: isValid ? '' : 'Please note, this is a required field', isValid: isValid});
  }

  getOneContract(id: string): void {
    if (id) {
      // this.apiService.getEndpoints(endPoints => {
      //   this.http.get(endPoints.sourcing + '/' + id).subscribe(
      //     (oneContract: IOneContractParams) => {
      //       if (oneContract) {
      //         this.oneContractId = id;
      //         oneContract = JsUtils.convertDataInObject(oneContract, (obj, o) => this.dateKeys.indexOf(o) > -1,
      //           (obj: any, o: string) => obj[o] = obj[o] ? moment(obj[o]).format(DATE_FORMAT) : '');
      //         this.createOneContractStoreService.oneContract$.next(oneContract);
      //         // window.history.replaceState({}, '', `#/${ROUTES_NAMES.oneContract}/${ROUTES_NAMES.createOneContract}/${id}`);
      //       }
      //     },
      //     () => {
      //       const errorPopupData: IPopupData = {
      //         title: 'Error',
      //         content: 'Contract Not Found!',
      //         buttons: [{
      //           text: 'OK',
      //           handler: closeFn => {
      //             closeFn();
      //             if (this.oneContractId) {
      //               this.getOneContract(this.oneContractId); // return the the previous contract.
      //             } else {
      //               // window.history.replaceState({}, '', '#/' + ROUTES_NAMES.oneContract);
      //             }
      //           }
      //         }]
      //       };
      //       this.popupService.showError(errorPopupData);
      //     }
      //   );
      // });
    }
  }

  saveOneContract(cb: any): Subject<boolean> {
    const saveCompleted$: Subject<boolean> = new Subject<boolean>();
    const oneContractObj: IOneContractParams = this.allOneContractService.buildOneContract();
    this.createOneContractStoreService.contractSeasons$.pipe(
      take(1),
      tap((seasons: any[]) => {
        this.addSeasonAndTravelWindowToOneContract(oneContractObj, seasons);
      }),
      switchMap(() => this.createOrUpdateContract(oneContractObj, cb, saveCompleted$))
    ).subscribe((savedWithoutError) => {
      if (savedWithoutError) {
        this.allOneContractService.validateContract().subscribe(isValid => {
          if (isValid) {
            this.toastService.showToastMessage(this.toastSuccessConfig);
          } else {
            this.toastService.showToastMessage(this.toastWarningConfig);
          }
        });
        oneContractObj.id = +this.oneContractId;
        oneContractObj.dontUpdateView = true;
        this.createOneContractStoreService.oneContract$.next(JsUtils.deepCopy(oneContractObj));
      } else {
        this.toastService.showToastMessage(this.toastErrorConfig);
      }
    });

    return saveCompleted$;
  }

  addSeasonAndTravelWindowToOneContract(oneContractObj: IOneContractParams, seasons: any[]): void {
    this.updateOneContractSeasons(seasons, oneContractObj);
    oneContractObj = JsUtils.convertDataInObject(oneContractObj, (obj, o) => this.dateKeys.indexOf(o) > -1, (obj: any, o: string) => obj[o] = obj[o] ? moment(obj[o]).format('YYYY-MM-DD') : null);
    if (seasons && seasons.length) {
      const travelWindow = {from: null, to: null};
      if (seasons[0].seasonRange.from) {
        travelWindow.from = moment(seasons[0].seasonRange.from, DATE_FORMAT).format('YYYY-MM-DD');
      }
      seasons.forEach(season => travelWindow.to = season.seasonRange.to ? moment(season.seasonRange.to, DATE_FORMAT).format('YYYY-MM-DD') : null);
      oneContractObj.travelWindow = travelWindow.from || travelWindow.to ? travelWindow : null;
    }
  }

  updateOneContractSeasons = (seasons: any[], oneContractObj: any) => {
    oneContractObj.contractData.seasons = [];

    seasons.forEach((season: any, index: number) => {
      if (season.selectedSeasonType === SEASONS_TYPES.A) {
        const seasonObj = this.buildSeasonObj(season, 'ALL', JsUtils.numberToLatter(index + 1, true));
        oneContractObj.contractData.seasons.push(seasonObj);
      } else {
        let seasonObj = this.buildSeasonObj(season, 'WKDY', JsUtils.numberToLatter(index + 1, true) + ' WKDY');
        oneContractObj.contractData.seasons.push(seasonObj);
        seasonObj = this.buildSeasonObj(season, 'WKND', JsUtils.numberToLatter(index + 1, true) + ' WKND');
        oneContractObj.contractData.seasons.push(seasonObj);
      }
    });
  };

  createOrUpdateContract(oneContractObj: IOneContractParams, cb: any, saveCompleted$: Subject<boolean>): Subject<boolean> {
    localStorage.setItem('contract', JSON.stringify(oneContractObj));
    this.router.navigate(['contract', {oneContractId: 1}]);
    setTimeout(() => saveCompleted$.next(true));
    return saveCompleted$;
  }

  discountTypeHandler(discountName: string): void {
    let results: number = 0;
    switch (discountName) {
      case DISCOUNTS_TYPES['NRFDiscount']:
        this.allOneContractService.nrfDiscountService.params.discountRows.forEach((c: IContractDiscountRow) => results += (isNaN(c.discount) || c.discount.toString() === '') ? 0 : +c.discount);
        break;
      case DISCOUNTS_TYPES['opaqueDiscount']:
        this.allOneContractService.opaqueDiscountService.params.discountRows.forEach(c => results += (isNaN(c.discount) || c.discount.toString() === '') ? 0 : +c.discount);
        break;
      case DISCOUNTS_TYPES['HBGSelectDiscount']:
        this.allOneContractService.hbgSelectDiscountService.params.discountRows.forEach(c => results += (isNaN(c.discount) || c.discount.toString() === '') ? 0 : +c.discount);
        break;
      case DISCOUNTS_TYPES['earlyBookingDiscount']:
        this.allOneContractService.contractEarlyBookingDiscountService.earlyBookingDiscountParams.forEach(c => results += (isNaN(c.discount) || c.discount.toString() === '') ? 0 : +c.discount);
        break;
      case DISCOUNTS_TYPES['longStayDiscount']:
        this.allOneContractService.contractLongStayService.contractLongStayDiscountParams.forEach(c => results += (isNaN(c.discount) || c.discount.toString() === '') ? 0 : c.discount);
        break;
      case DISCOUNTS_TYPES.freeNights:
        const freeNightsRows = this.allOneContractService.contractPayStayService.tableRows;
        if (freeNightsRows[0] && freeNightsRows[0].payNights > 0 && freeNightsRows[0].stayNights > 0) {
          results = 1;
        }

        break;
    }
    if (results === 0) {
      delete this.createOneContractStoreService.selectedDiscounts[discountName];
    } else {
      this.createOneContractStoreService.selectedDiscounts[discountName] = true;
    }
    this.createOneContractStoreService.selectedDiscounts$.next(this.createOneContractStoreService.selectedDiscounts);
  }

  buildSeasonObj(season: any, weekDaysType: string, seasonCode: string): any {
    const seasonObj: any = {
      seasonCode,
      travelWindow: {
        dateFrom: season.seasonRange.from ? season.seasonRange.from : null,
        dateTo: season.seasonRange.to ? season.seasonRange.to : null
      }
    };
    seasonObj.seasonCode = seasonCode;
    seasonObj.isMonday = weekDaysType === 'ALL' || weekDaysType === 'WKDY';
    seasonObj.isTuesday = weekDaysType === 'ALL' || weekDaysType === 'WKDY';
    seasonObj.isWednesday = weekDaysType === 'ALL' || weekDaysType === 'WKDY';
    seasonObj.isThursday = weekDaysType === 'ALL' || weekDaysType === 'WKDY';
    seasonObj.isFriday = weekDaysType === 'ALL' || weekDaysType === 'WKDY';
    seasonObj.isSaturday = weekDaysType === 'ALL' || weekDaysType === 'WKND';
    seasonObj.isSunday = weekDaysType === 'ALL' || weekDaysType === 'WKND';
    return seasonObj;
  }

  roomAndCharacteristicHandler = (newRoomList: ISelectItem[], oldRoomList: ISelectItem[], tableRows: any[], params: any[], paramName: string): void => {
    if (newRoomList) {
      if (oldRoomList.length > newRoomList.length) { // check for any delete
        const itemsToDelete: ISelectItem[] = oldRoomList.filter(r1 => {
          return newRoomList.filter(r2 => r1.id === r2.id).length === 0;
        });
        tableRows.forEach((r: any, index: number) => {
          r.roomAndCharacteristicList = this.selectInputService.removeItemsFromList(r.roomAndCharacteristicList, null, itemsToDelete.map(room => room.id));
          if (this.selectInputService.isContains(itemsToDelete, null, params[index].roomAndCharacteristic)) {
            params[index].roomAndCharacteristic = null;
          }
        });
      } else {
        tableRows.forEach((row: any, index: number) => {
          row.roomAndCharacteristicList = JsUtils.deepCopy(newRoomList);
          if (params[index].roomAndCharacteristic === 'all') {
            row.roomAndCharacteristicList.unshift({id: 'all', name: 'All'});
            this.selectInputService.updateIsSelected(row.roomAndCharacteristicList, null, 'all');
          }
        });
        tableRows.forEach((row1: any, ind1: number) => {
          if (this.includedAllOptions(params[ind1][paramName], tableRows, params, paramName, oldRoomList) && params.filter(r => r.roomAndCharacteristic === 'all').length > 0 && params[ind1].roomAndCharacteristic !== 'all') {
            params[ind1].roomAndCharacteristic = null;
            row1.roomAndCharacteristicList = [];
          } else {
            if (params[ind1].roomAndCharacteristic !== 'all') {
              if (this.selectInputService.isContains(newRoomList, null, params[ind1].roomAndCharacteristic)) {
                this.selectInputService.updateIsSelected(row1.roomAndCharacteristicList, null, params[ind1].roomAndCharacteristic);
                tableRows.forEach((row2: any, ind2: number) => {
                  if (ind1 !== ind2 && params[ind1][paramName] === params[ind2][paramName]) {
                    row2.roomAndCharacteristicList = this.selectInputService.removeItemsFromList(row2.roomAndCharacteristicList, null, params[ind1].roomAndCharacteristic);
                  }
                });
              } else {
                params[ind1].roomAndCharacteristic = null;
              }
            }
            if (row1.roomAndCharacteristicList.length > 0 && !this.selectInputService.isContains(row1.roomAndCharacteristicList, null, 'all')) {
              row1.roomAndCharacteristicList.unshift({id: 'all', name: 'All'});
            }
          }
        });
      }
    }
  };

  includedAllOptions(paramValue: string, tableRows: any[], params: any[], paramName: string, currentRoomList: ISelectItem[]): boolean {
    let includedAllOptions: boolean = false;
    const roomsList: ISelectItem[] = [];
    tableRows.forEach((r: any, index: number) => {
      if (params[index][paramName] === paramValue && r.roomAndCharacteristicList) {
        const selectedOption: ISelectItem = <ISelectItem>this.selectInputService.getSelectedItem(r.roomAndCharacteristicList.filter(rc => JsUtils.isDefineAndNotNull(rc)), false);
        if (selectedOption) {
          if (!this.selectInputService.isContains(roomsList, null, selectedOption.id)) {
            roomsList.push(selectedOption);
          }
        }
      }
    });

    if (roomsList.length === currentRoomList.filter(r => r.id !== 'all').length && roomsList.length !== 0 || this.selectInputService.isContains(roomsList, null, 'all')) {
      includedAllOptions = true;
    }
    return includedAllOptions;
  }

  getContractDetails(hotelId: string, cb: any, errorCb: any): void {
    // this.apiService.getEndpoints((endpoints: IEndpoints) => {
    //   this.http.get(endpoints.oneContractLoadContracts + `?hotelId=${hotelId}&limit=20`).pipe(
    //     timeout(60000),
    //     catchError(err => {
    //       if (errorCb) {
    //         errorCb(err);
    //       }
    //       return of(this.returnEmptyContractResults());
    //     })
    //   )
    //     .subscribe((results: ILoadOneContractResults) => {
    //       if (cb) {
    //         cb(results);
    //       }
    //     }, (err => {
    //       if (errorCb) {
    //         errorCb(err);
    //       }
    //
    //       return of(this.returnEmptyContractResults());
    //     }));
    // });
  }

  returnEmptyContractResults(): ILoadOneContractResults {
    return <ILoadOneContractResults>{items: [], totalCount: 0};
  }

  importOneContract(contractId: string): Observable<any> {
    const subject = new Subject<any>();
    // this.apiService.getEndpoints((e: IEndpoints) => {
    //   this.http.get(e.oneContractImportSelectedContract + '/' + contractId)
    //     .subscribe(res => subject.next(res), err => subject.error(err));
    // });
    return subject;
  }
}

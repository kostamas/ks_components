import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {take} from 'rxjs/operators';
import {IOneContractParams} from './one-contract-object';
import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot} from '@angular/router';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {ISelectItem} from '../../shared/types/ISelect';
import {AllOneContractService} from './all-one-contract.service';
import {CreateOneContractService} from './create-one-contract.service';
import {PopupService} from '../../shared/popup-module/popup.service';
import {CreateOneContractStoreService} from './create-one-contract-store.service';
import {CreateOneContractComponent} from './create-one-contract.component';
import {Observable} from 'rxjs/Observable';
import {combineLatest} from 'rxjs/observable/combineLatest';
import {IPopupData} from '../../shared/types/modal';


@Injectable()
export class OneContractService implements CanDeactivate<any> {
  public leftSectionCollapsed$: Subject<boolean> = new Subject<boolean>();
  public oneContractsResults$: Subject<IOneContractParams[]> = new Subject<IOneContractParams[]>();
  public creationUsers$: BehaviorSubject<{ id: string }[]> = new BehaviorSubject<{ id: string }[]>(null);
  public countries$: BehaviorSubject<ISelectItem[]> = new BehaviorSubject<ISelectItem[]>(null);
  public companies$: BehaviorSubject<ISelectItem[]> = new BehaviorSubject<ISelectItem[]>(null);
  public emptyOneContract: IOneContractParams = <IOneContractParams>{}; // will initialize in CreateOneContractComponent

  constructor(private http: HttpClient,
              private allOneContractService: AllOneContractService,
              private createOneContractService: CreateOneContractService,
              private popupService: PopupService,
              private createOneContractStoreService: CreateOneContractStoreService) {
    this.leftSectionCollapsed$.next(false);
  }

  public canDeactivate(component: CreateOneContractComponent, currentRoute: ActivatedRouteSnapshot,
                       currentState: RouterStateSnapshot,
                       nextState: RouterStateSnapshot): Observable<boolean> | boolean {
    const canDeactivate$: Subject<boolean> = new Subject();

    combineLatest(this.createOneContractStoreService.oneContract$.pipe(take(1)), this.createOneContractStoreService.contractSeasons$.pipe(take(1)))
      .subscribe(([oneContract, seasons]) => {
        oneContract = oneContract ? oneContract : this.emptyOneContract;
        // const createContractRoute = ROUTES_NAMES.oneContract + '/' + ROUTES_NAMES.createOneContract;
        // const isSamePage = currentState.url.indexOf(createContractRoute) > -1 && nextState.url.indexOf(createContractRoute) > -1;

        // if (isSamePage || this.compareBetweenCurrentAndLastContracts(oneContract, seasons)) {
        // 	setTimeout(() => canDeactivate$.next(true));
        // } else {
        // 	this.popupService.showWarning(this.getDeactivatePopupData(canDeactivate$), {disableClose: true});
        // }
      });

    return canDeactivate$;
  }

  private getDeactivatePopupData(canDeactivate$: Subject<boolean>): IPopupData {
    return {
      title: 'Discard Changes?',
      content: 'Are you sure you want to navigate away from this page?&#10; You will lose any unsaved changes.',
      buttons: [{
        text: 'Stay',
        btnClass: 'hb-button-blue',
        handler: (closeModal) => {
          closeModal();
          canDeactivate$.next(false);
        }
      }, {
        text: 'Leave',
        btnClass: 'hb-button-white',
        handler: (closeModal) => {
          closeModal(closeModal);
          canDeactivate$.next(true);
        }
      }]
    };
  }

  // getContractResults(searchParams: ISearchContract, cb: (contractsResults: IOneContractParams[]) => any, errorCb: any): void {
  // 	this.apiService.getEndpoints((endPoints: IEndpoints) => {
  // 		this.http.post(`${endPoints.preContractsSearch}?limit=10000`, searchParams).subscribe(cb, errorCb);
  // 	});
  // }

  // searchContractById(contractId: string, successCB: any, errorCB: any): void {
  // 	this.apiService.getEndpoints((endPoints: IEndpoints) => {
  // 		this.http.get(endPoints.sourcing + '/' + contractId).subscribe(() => successCB(), () => errorCB());
  // 	});
  // }

  // getCreationUsers(): void {
  // 	this.apiService.getEndpoints((endPoints: IEndpoints) => {
  // 		this.http.get(endPoints.creationUsers).subscribe((users: { id: string }[]) => this.creationUsers$.next(users));
  // 	});
  // }

  // getCountriesList(): void {
  // 	this.apiService.getEndpoints((endpoints: IEndpoints) => {
  // 		const url: string = `${endpoints.countriesAutoSuggestSourcing}?limit=500`;
  // 		this.http.get(url)
  // 			.pipe(map((results: any) => {
  // 				let items: ISelectItem[] = [];
  // 				if (results && results.items) {
  // 					items = results.items.sort((n1, n2) => JsUtils.sortByNames(n1.name, n2.name));
  // 				}
  // 				return items;
  // 			}))
  // 			.subscribe((countries: ISelectItem[]) => this.countries$.next(countries));
  // 	});
  // }

  // getCompaniesList(): void {
  // 	this.apiService.getEndpoints((endpoints: IEndpoints) => {
  // 		const url: string = `${endpoints.companies}?limit=10000`;
  // 		this.http.get(url).subscribe((countries: { items: ISelectItem[] }) => {
  // 			if (countries) {
  // 				const sortedCompanies = countries.items.sort((n1, n2) => JsUtils.sortByNames(n1.name, n2.name));
  // 				this.companies$.next(sortedCompanies);
  // 			}
  // 		});
  // 	});
  // }

  // getOfficesByCompany(companyId: string, cb: any): void {
  // 	this.apiService.getEndpoints((endpoints: IEndpoints) => {
  // 		const url: string = `${endpoints.offices}?companyId=${companyId}&&limit=10000`;
  // 		this.http.get(url).subscribe((offices: { items: any[] }) => {
  // 			if (offices) {
  // 				const sortedCompanies = offices.items.sort((n1, n2) => JsUtils.sortByNames(n1.name, n2.name));
  // 				sortedCompanies.forEach((office: any) => {
  // 					office.id = office.officeId;
  // 					office.name = office.officeId;
  // 				});
  // 				cb(sortedCompanies);
  // 			}
  // 		});
  // 	});
  // }

  // public compareBetweenCurrentAndLastContracts(oneContract: IOneContractParams, seasons: any[]): boolean {
  // 	let oneContractObjToCompare1: IOneContractParams = this.allOneContractService.buildOneContract();
  // 	this.createOneContractService.addSeasonAndTravelWindowToOneContract(oneContractObjToCompare1, seasons);
  // 	const keysToCheck = Object.keys(oneContractObjToCompare1);
  // 	const hotelDataKeys = Object.keys(oneContractObjToCompare1.hotelData);
  // 	let oneContractObjToCompare2: IOneContractParams = <IOneContractParams>{};
  // 	keysToCheck.forEach(key => oneContractObjToCompare2[key] = oneContract[key]);
  // 	oneContractObjToCompare2.hotelData = <IHotelData>{};
  // 	hotelDataKeys.forEach(key => oneContractObjToCompare2.hotelData[key] = oneContract.hotelData[key]);
  //
  // 	oneContractObjToCompare1 = JsUtils.deepCopy(oneContractObjToCompare1);
  // 	oneContractObjToCompare2 = JsUtils.deepCopy(oneContractObjToCompare2);
  //
  // 	const dateKeys: string[] = ['dateFrom', 'dateTo', 'date'];
  //
  // 	oneContractObjToCompare1 = JsUtils.convertDataInObject(oneContractObjToCompare1, (obj, o) => dateKeys.indexOf(o) > -1,
  // 		(obj: any, o: string) => obj[o] = obj[o] ? moment(obj[o]).format(DATE_FORMAT) : '');
  //
  // 	oneContractObjToCompare2 = JsUtils.convertDataInObject(oneContractObjToCompare2, (obj, o) => dateKeys.indexOf(o) > -1,
  // 		(obj: any, o: string) => obj[o] = obj[o] ? moment(obj[o]).format(DATE_FORMAT) : '');
  //
  // 	return JsUtils.deepObjectComparision(oneContractObjToCompare1, oneContractObjToCompare2);
  // }
}

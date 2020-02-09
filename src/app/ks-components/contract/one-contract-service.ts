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
import {countriesList} from './currencies.constant';

const companiesList = [{name: 'company 1', id: '1'}, {name: 'company 2', id: '2'}, {name: 'company 3', id: '3'},
  {name: 'company 4', id: '4'}, {name: 'company 5', id: '5'}, {name: 'company 6', id: '6'}, {name: 'company 7', id: '7'},
  {name: 'company 8', id: '8'}, {name: 'company 9', id: '9'}, {name: 'company 10', id: '10'}];

@Injectable()
export class OneContractService implements CanDeactivate<any> {
  public leftSectionCollapsed$: Subject<boolean> = new Subject<boolean>();
  public countries$: BehaviorSubject<ISelectItem[]> = new BehaviorSubject<ISelectItem[]>(countriesList);
  public companies$: BehaviorSubject<ISelectItem[]> = new BehaviorSubject<ISelectItem[]>(null);
  public emptyOneContract: IOneContractParams = <IOneContractParams>{}; // will initialize in CreateOneContractComponent

  constructor(private http: HttpClient,
              private allOneContractService: AllOneContractService,
              private createOneContractService: CreateOneContractService,
              private popupService: PopupService,
              private createOneContractStoreService: CreateOneContractStoreService) {
    this.leftSectionCollapsed$.next(false);
    setTimeout(() => this.companies$.next(companiesList));
  }

  public canDeactivate(component: CreateOneContractComponent, currentRoute: ActivatedRouteSnapshot,
                       currentState: RouterStateSnapshot,
                       nextState: RouterStateSnapshot): Observable<boolean> | boolean {
    const canDeactivate$: Subject<boolean> = new Subject();

    combineLatest(this.createOneContractStoreService.oneContract$.pipe(take(1)), this.createOneContractStoreService.contractSeasons$.pipe(take(1)))
      .subscribe(([oneContract, seasons]) => {
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

  getOfficesByCompany(companyId: string, cb: any): void {
    cb([{name: 'office 1', id: '1'}, {name: 'office 2', id: '2'}, {name: 'office 3', id: '3'},
      {name: 'office 4', id: '4'}, {name: 'office 5', id: '5'}, {name: 'office 6', id: '6'}, {name: 'office 7', id: '7'},
      {name: 'office 8', id: '8'}, {name: 'office 9', id: '9'}, {name: 'office 10', id: '10'}]);
  }
}

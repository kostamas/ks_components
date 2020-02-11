import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {ISelectItem} from '../../shared/types/ISelect';
import {IOneContractParams} from './one-contract-object';
import {IContractSeason, IContractSelectedDiscounts} from './one-contract';
import {Subject} from 'rxjs/Subject';
import {IFromTo} from '../../shared/types/calendar';
import {JsUtils} from '../../utils/jsUtils';

@Injectable()
export class CreateOneContractStoreService {
  public roomAndCharacteristic$: BehaviorSubject<ISelectItem[]> = new BehaviorSubject<ISelectItem[]>(null);
  public contractDateRange$: BehaviorSubject<IFromTo> = new BehaviorSubject<IFromTo>(null);
  public contractHotelName$: Subject<string> = new Subject<string>();
  public contractSeasons$: BehaviorSubject<IContractSeason[]> = new BehaviorSubject<IContractSeason[]>(null);
  public selectedDiscounts$: BehaviorSubject<IContractSelectedDiscounts> = new BehaviorSubject<IContractSelectedDiscounts>(<IContractSelectedDiscounts>{});
  public selectedCurrency$: BehaviorSubject<any> = new BehaviorSubject<any>('');
  public classification$: BehaviorSubject<any> = new BehaviorSubject<any>('');
  public oneContract$: BehaviorSubject<IOneContractParams> = new BehaviorSubject<IOneContractParams>(null);
  public isOneContractViewMode$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  public selectedDiscounts: IContractSelectedDiscounts = <IContractSelectedDiscounts>{};

  public oneContract: IOneContractParams;

  constructor() {
  }

  public setOneContract(newOneContract: IOneContractParams): void {
    this.oneContract = newOneContract;
  }

  public isOneContractChanged(newOneContract: IOneContractParams): boolean {
    return !JsUtils.deepObjectComparision(this.oneContract, newOneContract);
  }
}

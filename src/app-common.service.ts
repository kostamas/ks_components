import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {take} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {JsUtils} from './app/utils/jsUtils';
import {InputUtils} from './app/utils/input-utils';

@Injectable()
export class AppCommonService {
  public autoSuggestAPIS: any = {
    hotelAutoSuggest: 'hotelAutoSuggest',
    destinationAutoSuggest: 'destinationAutoSuggest',
    tourOperatorAutoSuggest: 'tourOperatorAutoSuggest',
    tourOperationInterfaceAutoSuggest: 'tourOperationInterfaceAutoSuggest',
    sourceMarketAutoSuggest: 'sourceMarketAutoSuggest',
    clientAutoSuggest: 'tourOperatorAutoSuggest',
    regionAutoSuggest: 'regionAutoSuggest',
    hotelChainsAutoSuggest: 'hotelChainsAutoSuggest',
    hotelAutoSuggestSourcing: 'hotelAutoSuggestSourcing',
    clientAutoSuggestSourcing: 'clientAutoSuggestSourcing',
    incomingOfficeAutoSuggest: 'incomingOfficeAutoSuggest'
  };

  constructor(private http: HttpClient) {
  }

  autoSuggest(autoSuggestApi: string, searchText: string, numOfResults: number = 10, active?: boolean, visible?: boolean): Observable<any> {
    const searchResult$ = new Subject();
    const cb = results => searchResult$.next(results);
    // this.apiService.getEndpoints((endpoints: IEndpoints) => {
    // 	let url = `${endpoints[autoSuggestApi]}?text=${searchText}&limit=${numOfResults}`;
    // 	if (JsUtils.isDefined(active)) {
    // 		url += `&active=${active}`;
    // 	}
    // 	if (JsUtils.isDefined(visible)) {
    // 		url += `&visible=${visible}`;
    // 	}
    // 	this.http.get(url)
    // 		.pipe(map((results: any) => results && results.items))
    // 		.subscribe(cb);
    // });
    return searchResult$.pipe(take(1));
  }

  autoSuggestWithoutActiveAndVisible(autoSuggestApi: string, searchText: string, numOfResults: number = 10): Observable<any> {
    const searchResult$ = new Subject();
    const cb = results => searchResult$.next(results);
    // this.apiService.getEndpoints((endpoints: IEndpoints) => {
    //   const url = `${endpoints[autoSuggestApi]}?text=${searchText}&limit=${numOfResults}`;
    //   this.http.get(url)
    //     .pipe(map((results: any) => results && results.items))
    //     .subscribe(cb);
    // });
    return searchResult$.pipe(take(1));
  }

  public requiredValidator = (msg: string = 'Error') => ({val, isDirty}) => ({
    message: msg,
    isValid: !isDirty || !!val
  });

  public selectInputNoSelectionValidator = (msg: string = 'Error') => ({val, isDirty}) => ({
    message: msg,
    isValid: val.filter(i => i.isSelected).length > 0
  });

  selectInputTextHandlerNameAndId(selectedOption: any): string {
    if (selectedOption && selectedOption.name) {
      if (JsUtils.isDefineAndNotNull(selectedOption.id) && selectedOption.id.toString().toLowerCase() !== 'all') {
        return InputUtils.displayFormatNameAndIdOrEmptyString(selectedOption.name, selectedOption.id);
      } else {
        return selectedOption.name;
      }
    } else {
      return '';
    }
  }

  rangeValueValidator(minNumber: number, maxNumber: number, isFloat: boolean = false): any {
    return $event => InputUtils.isRangeValue($event, minNumber, maxNumber, isFloat);
  }
}

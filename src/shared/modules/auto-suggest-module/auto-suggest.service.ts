import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {SearchResult} from './mock-results';

@Injectable({
  providedIn: 'root'
})
export class AutoSuggestService {
  public searchCallback: Observable<SearchResult[]>;
  public textToSearch: string;
  public displayResults$: Subject<boolean> = new Subject<boolean>();
  public textChanged$: Subject<string> = new Subject<string>();
  public resetSearch: Subject<any> = new Subject<any>();

  constructor() {
    this.textChanged$.subscribe(t => {
      this.displayResults$.next(true);
      console.log('show result');
    });
    this.displayResults$.next(false);
  }

  search(text: string): void {
    this.textToSearch = text;
    this.displayResults$.next(false);
    console.log('searching for ' + text + '...');
  }

  requestResults(): void {
      this.textChanged$.next(this.textToSearch);
  }
}

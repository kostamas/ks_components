import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiService} from '../../../services/api.service';
import {BehaviorSubject, Subject} from 'rxjs';
import {InjectionToken} from '@angular/core';

export const MainHeaderConfig = new InjectionToken<any>(null);

@Injectable({
  providedIn: 'root'
})
export class MainHeaderService {

  public menuLoaded$: Subject<boolean> = new Subject<boolean>();
  public pageClick$: Subject<any> = new Subject();
  public pagesPaths$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public closeMenu$: Subject<boolean> = new Subject();
  public searchSimulatorId: number = -13;

  constructor(private http: HttpClient, private apiService: ApiService, @Inject(MainHeaderConfig) public menusConfig: IMainHeaderConfig) {
    this.menuLoaded$.next(false);
  }

  getMenus(cb: (HeaderTabs: IHeaderTab[]) => any): void {
    this.apiService.endPoints$.subscribe(endpoints => endpoints && this.http.get(endpoints.menus).subscribe(cb));
  }
}

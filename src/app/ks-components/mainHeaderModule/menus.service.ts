import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
// import {ApiService} from '../../../services/api.service';

@Injectable()
export class MenusService {

  constructor(private http: HttpClient) {
  }

  getMenus(cb: (HeaderTabs: IHeaderTab[]) => any): void {
    // this.apiService.endPoints$.subscribe(endpoints => this.http.get(endpoints.menus).subscribe(cb));
  }
}

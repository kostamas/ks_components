import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OverlayService {

  public overlayClick$: Subject<any> = new Subject<any>();
  public isOverlayOpen$: Subject<boolean> = new Subject<boolean>();

  constructor() { }
}

import {Injectable, OnDestroy} from '@angular/core';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/filter';
import {Subject} from 'rxjs/Subject';
import {KsStore} from '../../../core/ks-store.service';

@Injectable()
export class ChatStoreService  extends KsStore implements OnDestroy {
  private chatParticipants$ = new BehaviorSubject<any>(null);
  private activeChatter$ = new BehaviorSubject<any>(null);
  private generalChatMessage$ = new Subject<any>();

  public notifyChatParticipants(chatParticipants: any) {
    this.chatParticipants$.next(chatParticipants);
  }

  public onChatParticipants(cb) {
    const subscription = this.chatParticipants$
      .filter(data => Array.isArray(data))
      .subscribe(cb);
    this.addSubscription(subscription, cb);
    return subscription;
  }

  public notifyActiveChatter(chatter: any) {
    this.activeChatter$.next(chatter);
  }

  public onActiveChatter(cb) {
    let subscription = this.activeChatter$.filter(data => data && data !== null).subscribe(cb);
    this.addSubscription(subscription, cb);
    return subscription;
  }

  public notifyGeneralChatMessage(generalMessage: any) {
    this.generalChatMessage$.next(generalMessage);
  }

  public onGeneralChatMessage(cb) {
    const subscription = this.generalChatMessage$.subscribe(cb);
    this.addSubscription(subscription, cb);
    return this.subscriptions[this.subscriptions.length - 1].subscription;
  }

  ngOnDestroy() {
    this.unSubscribeAll();
    this.subscriptions = [];
  }
}

import {Injectable, OnDestroy} from '@angular/core';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/filter';
import {Subject} from "rxjs/Subject";

@Injectable()
export class ChatStoreService implements OnDestroy {
  private chatParticipants$ = new BehaviorSubject<any>(null);
  private activeChatter$ = new BehaviorSubject<any>(null);
  private generalChatMessage$ = new Subject<any>();

  private subscriptions = [];

  constructor() {
  }

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

  public unSubscribe = (cb) => {
    let index = -1;
    for (let i = 0; i < this.subscriptions.length; i++) {
      if(this.subscriptions[i].cb === cb){
        index = i;
        break;
      }
    }

    if (index > -1) {
      this.subscriptions[index].subscription.unsubscribe(cb);
      this.subscriptions.splice(index, 1);
    }
  };

  public unSubscribeAll = () => {
    this.subscriptions.forEach(subscriptionData => {
      subscriptionData.subscription.unsubscribe();
    });
    this.subscriptions = [];
  };

  private addSubscription(subscription, cb) {
    this.subscriptions.push({subscription, cb})
  }

  ngOnDestroy() {
    this.unSubscribeAll();
    this.subscriptions = [];
  }
}

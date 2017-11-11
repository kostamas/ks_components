import {Injectable, OnDestroy} from '@angular/core';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/filter';

@Injectable()
export class ChatStoreService implements OnDestroy {
  private chatParticipants$ = new BehaviorSubject<any>(null);
  private activeChat$ = new BehaviorSubject<any>(null);
  private chats$ = new BehaviorSubject<any>(null);
  private subscriptions = [];

  constructor() {
  }

  public notifyChatParticipants(chatParticipants: any) {
    this.chatParticipants$.next(chatParticipants);
  }

  public onChatParticipants(cb) {
    this.subscriptions.push(this.chatParticipants$
      .filter(data => Array.isArray(data))
      .subscribe(cb));
    return this.subscriptions[this.subscriptions.length - 1];
  }

  public notifyActiveChat(chatParticipants: any) {
    this.activeChat$.next(chatParticipants);
  }

  public onActiveChat(cb) {
    this.subscriptions.push(this.activeChat$
      .filter(data => data && data !== null)
      .subscribe(cb));
    return this.subscriptions[this.subscriptions.length - 1];
  }

  public notifyChats(chat: any) {
    this.chats$.next(chat);
  }

  public onChats(cb, userId) {
    this.subscriptions.push(this.activeChat$
      .filter(chat => chat && chat.users.indexOf(userId) > -1)
      .subscribe(cb));
    return this.subscriptions[this.subscriptions.length - 1];
  }

  public unSubscribe = (cb) => {
    const index = this.subscriptions.indexOf(cb);
    if (index > -1) {
      this.subscriptions[index].unsubscribe(cb);
      this.subscriptions.splice(index, 1);
    }
  };

  public unSubscribeAll = () => {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    })
  };

  ngOnDestroy() {
    this.unSubscribeAll();
    this.subscriptions = [];
  }
}

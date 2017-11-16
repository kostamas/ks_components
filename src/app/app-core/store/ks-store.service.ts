export class KsStore {

  protected subscriptions = [];

  public unSubscribe = (cb, id?) => {
    for (let i = 0; i < this.subscriptions.length; i++) {
      if (id && this.subscriptions[i].id === id) {
        this.removeSubscription(i);
        break;
      } else if (this.subscriptions[i].cb === cb) {
        this.removeSubscription(i);
        break;
      }
    }
  };

  public unSubscribeAll = () => {
    this.subscriptions.forEach(subscriptionData => {
      subscriptionData.subscription.unsubscribe();
    });
    this.subscriptions = [];
  };

  public addSubscription(subscription, cb, id?) {
    this.subscriptions.push({subscription, cb, id: id})
  }

  private removeSubscription(index) {
    this.subscriptions[index].subscription.unsubscribe();
    this.subscriptions.splice(index, 1);
  }
}

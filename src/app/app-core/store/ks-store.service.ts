export class KsStore{

  protected subscriptions = [];

  public unSubscribe = (cb) => {
    let index = -1;
    for (let i = 0; i < this.subscriptions.length; i++) {
      if (this.subscriptions[i].cb === cb) {
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

  public addSubscription(subscription, cb) {
    this.subscriptions.push({subscription, cb})
  }
}

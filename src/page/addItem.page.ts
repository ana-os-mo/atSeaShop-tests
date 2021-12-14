import { $, ElementFinder } from 'protractor';

export class AddItemPage {
  private item1: ElementFinder;
  private item2: ElementFinder;
  private item3: ElementFinder;
  private checkoutButton: ElementFinder;

  constructor() {
    this.item1 = $('.titleBottom > .tileAdd > button:nth-child(1)');
    this.item2 = $('.titleBottom > .tileAdd > button:nth-child(6)');
    this.item3 = $('.titleBottom > div.tileAdd > button:nth-child(7)');
    this.checkoutButton = $('.checkout-button > a')    
}

  public async addItems(): Promise<void> {
    await this.item1.click();
    await this.item2.click();
    await this.item3.click();
  }

  public async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }
}

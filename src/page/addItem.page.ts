import { $, ElementFinder } from 'protractor';

export class AddItemPage {
  private item1: ElementFinder;
  private item2: ElementFinder;
  private item3: ElementFinder;
  private checkoutButton: ElementFinder;

  constructor() {
    this.item1 = $('#root > div > div:nth-child(5) > div > div:nth-child(1) > div > div.titleBottom > div.tileAdd > button');
    this.item2 = $('#root > div > div:nth-child(5) > div > div:nth-child(6) > div > div.titleBottom > div.tileAdd > button');
    this.item3 = $('#root > div > div:nth-child(5) > div > div:nth-child(7) > div > div.titleBottom > div.tileAdd > button');
    this.checkoutButton = $('#root > div > div:nth-child(4) > div > div.checkout-button > a')    
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

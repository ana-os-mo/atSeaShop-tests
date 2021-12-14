import { $, ElementFinder } from 'protractor';

export class AddItemPage {
  private item1: ElementFinder;
  private item2: ElementFinder;
  private item3: ElementFinder;
  private checkoutButton: ElementFinder;

  constructor() {
    this.item1 = $('.tileAdd > button:nth-child(1)');
    this.item2 = $('.tileAdd > button:nth-child(1)');
    this.item3 = $('.tileAdd > button:nth-child(1)');
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

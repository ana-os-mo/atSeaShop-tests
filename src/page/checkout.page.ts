import { $, ElementFinder } from 'protractor';

export class CheckoutPage {
  //credit card information
  private firstName: ElementFinder;
  private lastName: ElementFinder;
  private cardNumber: ElementFinder;
  private ccv: ElementFinder;
  private mmyy: ElementFinder;
  //billing information
  private company: ElementFinder;
  private title: ElementFinder;
  private address: ElementFinder;
  private city: ElementFinder;
  private submit: ElementFinder;
  private continue: ElementFinder;

  constructor() {
    this.firstName = $('input[name="firstName"]');
    this.lastName = $('input[name="lastName"]');
    this.cardNumber = $('input[name="cardNumber"]');
    this.ccv = $('input[name="cvv"]');
    this.mmyy = $('input[name="expirationDate"]');
    this.company = $('input[name="company"]');
    this.title = $('input[name="title"]');
    this.address = $('input[name="address"]');
    this.city = $('input[name="city"]');
    this.submit = $('.infoButton > button');
    this.continue = $('.successButton > button');
  }

  public async FillCreditInfo(): Promise<void> {
    await this.firstName.sendKeys('e');
    await this.lastName.sendKeys('g');
    await this.cardNumber.sendKeys('1');
    await this.ccv.sendKeys('2');
    await this.mmyy.sendKeys('1212');
  }

  public async FillBillingInfo(): Promise<void> {
    await this.company.sendKeys('Elver SAS');
    await this.title.sendKeys('CEO');
    await this.address.sendKeys('cr 2389 h 382');
    await this.city.sendKeys('Narnia');
  }

  public async CompleteOrder(): Promise<void> {
    await this.submit.click();
  }

  public async ContinueShopping(): Promise<void> {
    await this.continue.click();
  }
}

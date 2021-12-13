import { $, ElementFinder } from 'protractor';
const { customerForOrder } = require('../../src/testObjects/toyOrders')

export class SignUpPage {
  private signInNav: ElementFinder;
  private userName: ElementFinder;
  private password: ElementFinder;
  private submit: ElementFinder;
  private continue: ElementFinder;

  constructor() {
    this.signInNav = $('.navUser > div.buttonSection > div > button:nth-child(1)');
    this.userName = $('input[name="username"]');
    this.password = $('input[name="password"]');
    this.submit = $('.createFormButton > button');
    this.continue = $('.successButton > button');
  }

  public async NavButtonSignUp(): Promise<void> {
    await this.signInNav.click();
  }

  public async FillSignUp(): Promise<void> {
    await this.userName.sendKeys(customerForOrder.username);
    await this.password.sendKeys(customerForOrder.password);
  }

  public async SignUp(): Promise<void> {
    await this.submit.click();
  }

  public async ContinueShopping(): Promise<void> {
    await this.continue.click();
  }
}

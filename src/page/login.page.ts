import { $, ElementFinder } from 'protractor';
const { customerForOrder } = require('../../src/testObjects/toyOrders')

export class LoginPage {
  private signInNav: ElementFinder;
  private userName: ElementFinder;
  private password: ElementFinder;
  private submit: ElementFinder;

  constructor() {
    this.signInNav = $('.navUser > div.buttonSection > div > button:nth-child(2)');
    this.userName = $('input[name="username"]');
    this.password = $('input[name="password"]');
    this.submit = $('.loginFormButton > button');
  }

  public async NavButtonSignIn(): Promise<void> {
    await this.signInNav.click();
  }

  public async fillSignIn(): Promise<void> {
    await this.userName.sendKeys(customerForOrder.username);
    await this.password.sendKeys(customerForOrder.password);
  }

  public async signIn(): Promise<void> {
    await this.submit.click();
  }
}

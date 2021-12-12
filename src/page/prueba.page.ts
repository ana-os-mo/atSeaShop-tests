import { $, ElementFinder } from 'protractor';
const { customerForOrder } = require('../../src/testObjects/toyOrders')

export class PruebaPage {
  private userName: ElementFinder;
  private password: ElementFinder;
  private submit: ElementFinder;
  private cli: ElementFinder;

  constructor() {
    this.userName = $('input[name="username"]');
    this.password = $('input[name="password"]');
    this.submit = $('.loginFormButton > button');
    this.cli = $('.navUser > div.buttonSection > div > button:nth-child(2)');
  }

  public async fillSignIn(): Promise<void> {
    await this.userName.sendKeys(customerForOrder.username);
    await this.password.sendKeys(customerForOrder.password);
  }

  public async signup(): Promise<void> {
    await this.submit.click();
  }

  public async cliP(): Promise<void> {
    await this.cli.click();
  }
}

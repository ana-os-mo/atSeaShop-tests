import { $, ElementFinder } from 'protractor';

export class LogoutPage {
  private logout: ElementFinder;

  constructor() {
    this.logout = $('.navUser > .buttonSection > div > button');
  }

  public async LogOut(): Promise<void> {
    await this.logout.click();
  }
}

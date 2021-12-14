
import { browser } from "protractor";
import { expect } from 'chai';
import { del } from 'superagent';
import { StatusCodes } from 'http-status-codes';

import { SignUpPage } from "src/page/signup.page";
import { AddItemPage } from "src/page/addItem.page";
import { CheckoutPage } from "src/page/checkout.page";
import { LogoutPage } from "src/page/logout.page";
const { url } = require('../../src/testObjects/env')

const baseUrl = url.base_url;

describe('Load web page', function() {
  describe('It should load the web page', async function() {
    await browser.get(url.base_ui_url);
  })
})

describe('Delete customers', function() {
  let response;
  before(async function() {
    response = await del(`${baseUrl}/api/customer/`)
      .set('User-Agent', 'agent')
  });
  it('Then the customers should be successfully deleted ', function() {
    expect(response.status).to.equal(StatusCodes.NO_CONTENT);
  });
});

describe('when a you create a user', function() {
  const signUpPage = new SignUpPage();

  it('then a user should be created', async function() {
    browser.sleep(250000);
    await signUpPage.NavButtonSignUp();
    await signUpPage.FillSignUp();
    browser.sleep(250000);
    await signUpPage.SignUp();
  })
})

describe.skip('when a user tries to add items', function() {
  const addItemPage = new AddItemPage();
  before(async function() {
    await browser.get(url.base_ui_url);
  });
  after(async function() {
    // borrar usuario
  });

  it('then items should be added', async function() {
    await addItemPage.addItems();
    browser.sleep(250000);
    await addItemPage.proceedToCheckout();
  });
});

describe.skip('when a user fills the checkout information', function() {
  const checkoutPage = new CheckoutPage();

  it('then an order should be placed', async function() {
    browser.sleep(250000);
    await checkoutPage.FillCreditInfo();
    await checkoutPage.FillBillingInfo();
    await checkoutPage.CompleteOrder();
    await checkoutPage.ContinueShopping();
  });
});

describe('when an user tries to logout', function() {
  const logoutPage = new LogoutPage();

  it('then the user session should be closed', async function() {
    browser.sleep(250000);
    logoutPage.LogOut();
  })
})

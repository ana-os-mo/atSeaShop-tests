
import { browser } from "protractor";
import { expect } from 'chai';
import { del } from 'superagent';
import { StatusCodes } from 'http-status-codes';

import { SignUpPage } from "src/page/signup.page";
import { AddItemPage } from "src/page/addItem.page";

const baseUrl = 'http://localhost:8080';

describe('Load web page', function() {
  describe('It should load the web page', async function() {
    await browser.get('http://host.docker.internal:8080');
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
    browser.sleep(3000);
    await signUpPage.NavButtonSignUp();
    await signUpPage.FillSignUp();
    browser.sleep(3000);
    await signUpPage.SignUp();
  })
})

describe('when a user tries to add items', function() {
  const addItemPage = new AddItemPage();
  before(async function() {
    await browser.get('http://host.docker.internal:8080');
  });
  after(async function() {
    // borrar usuario
  });

  it('then items should be added', async function() {
    await addItemPage.addItems();
    browser.sleep(3000);
    await addItemPage.proceedToCheckout();
  });
});


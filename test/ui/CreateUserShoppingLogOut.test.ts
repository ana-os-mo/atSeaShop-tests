// import { browser, $ } from 'protractor';
// import { del, post } from 'superagent';
// import { StatusCodes } from 'http-status-codes';
// import * as chai from 'chai';
// const expect = chai.expect
// const baseUrl = 'http://localhost:8080';

// let userName = customerForOrder.username;
// let password = customerForOrder.password;

// describe('Delete customers', function() {
//   let response;
//   before(async function() {
//     response = await del(`${baseUrl}/api/customer/`)
//       .set('User-Agent', 'agent')
//   });
//   it('Then the customers should be successfully deleted ', function() {
//     expect(response.status).to.equal(StatusCodes.NO_CONTENT);
//   });

//   it('A customer should be created', async function() {
//     const response = await post(`${baseUrl}/api/customer/`)
//       .send(customerForOrder)
//       .set("User-Agent", "agent")
//       .set('Content-Type', 'application/json');

//     expect(response.status).to.equal(StatusCodes.CREATED);
//     expect(response.body).to.have.property("customerId");
//     // custId = response.body.customerId;
//   });
// });

// describe('Load web page', function() {
//   describe('It should load the web page', async function() {
//     await browser.get('http://host.docker.internal:8080');
//   })
// })

// describe('Full case purchasing multiple items', function() {
//   describe('When adding items to the shopping cart', function() {
//     beforeEach(async function() {
// // #root > div > div:nth-child(5) > div > div:nth-child(1) > div > div.titleBottom > div.tileAdd > button > div > span
//     });
//     it('Items should be added to the shopping cart', async function() {
//       await $('#root > div > div:nth-child(5) > div > div:nth-child(1) > div > div.titleBottom > div.tileAdd > button').click()
//       browser.sleep(3000);
//       // await $('.tileAdd > button:nth-child(6)').click()
//       // browser.sleep(3000);
//       // await $('.tileAdd > button:nth-child(7)').click()
//       // browser.sleep(3000);
//     });
//   });
//   describe('When creating an user', function() {
//     it('Then an user shold be created', async function() {
//       await $('.navUser > div.buttonSection > div > button:nth-child(1)').click()
//       browser.sleep(3000);
//       await $('input[name="username"]').sendKeys(`${userName}`)
//       await $('input[name="password').sendKeys(`${password}`)
//       await $('.createFormButton > button').click();
//       browser.sleep(3000);
//       await $('.successButton > button > div > spanbody > div:nth-child(6) > div > div > div > div > div.successButton > button').click();
//       browser.sleep(3000);
//     });
//   });
//   describe('When checking out', function(){
//     it('A purchase should be done', async function() {

//     })
//   })
// });

import { browser } from "protractor";
import { expect } from 'chai';
import { post, del } from 'superagent';
import { StatusCodes } from 'http-status-codes';

import { LoginPage } from "src/page/login.page";
import { AddItemPage } from "src/page/addItem.page";

const baseUrl = 'http://localhost:8080';
const { customerForOrder } = require('../../src/testObjects/toyOrders')

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

describe('when a user tries to Login', function() {
  const loginPage = new LoginPage();
  it('A customer should be created', async function() {
    const response = await post(`${baseUrl}/api/customer/`)
      .send(customerForOrder)
      .set("User-Agent", "agent")
      .set('Content-Type', 'application/json');

    expect(response.status).to.equal(StatusCodes.CREATED);
    expect(response.body).to.have.property("customerId");
  });
  before(async function() {
    await browser.get('http://host.docker.internal:8080');
  });
  after(async function() {
    // borrar usuario
  });

  it('fill signin form', async function() {
    browser.sleep(3000);
    await loginPage.NavButtonSignIn();
    await loginPage.fillSignIn();
    await loginPage.signIn();
  })
})

describe('Add items', function() {
  const addItemPage = new AddItemPage();
  before(async function() {
    await browser.get('http://host.docker.internal:8080');
  });
  after(async function() {
    // borrar usuario
  });

  it('r', async function() {
    browser.sleep(3000);
    await addItemPage.addItems();
    await addItemPage.proceedToCheckout();
  })
})

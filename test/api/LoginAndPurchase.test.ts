import { post, del } from 'superagent';
import { StatusCodes } from 'http-status-codes';
import * as chai from 'chai';

const { expect } = chai;
const { customerForOrder, credentialsForOrder, invalidCredentials } = require('../../src/testObjects/toyOrders')

const baseUrl = 'http://localhost:8080';

describe.only('API login an purchase', function() {
  let custId;
  describe("Loging in", function() {
    it('A customer should be created', async function() {
      const response = await post(`${baseUrl}/api/customer/`)
        .send(customerForOrder)
        .set("User-Agent", "agent")
        .set('Content-Type', 'application/json');

      expect(response.status).to.equal(StatusCodes.CREATED);
      expect(response.body).to.have.property("customerId");
      custId = response.body.customerId;
    });
    it('A customer should be loged in', async function() {
      const response = await post(`${baseUrl}/login/`)
        .send(credentialsForOrder)
        .set("User-Agent", "agent")
        .set('Content-Type', 'application/json');

      expect(response.status).to.equal(StatusCodes.OK);
      expect(response.body).to.have.property("token");
    });
    it('Error response if invalid credentials', async function() {
      try {
        await post(`${baseUrl}/login/`)
          .set("User-Agent", "agent")
          .send(invalidCredentials);
      } catch (error) {
        expect(error.response.status).to.equal(StatusCodes.UNAUTHORIZED);
        expect(error.response.body.errorMessage).to.equal('Customer name or password not found.');
      };
    });
    it('A customer should be deleted', async function() {
      const response = await del(`${baseUrl}/api/customer/${custId}/`)
        .set('User-Agent', 'agent');

      expect(response.status).to.equal(StatusCodes.NO_CONTENT);
    });
  })
});

import { post, get, put, del } from 'superagent';
import { StatusCodes } from 'http-status-codes';
import * as chai from 'chai';
import * as chaiJSchema from 'chai-json-schema';

chai.use(chaiJSchema);
const { expect } = chai;
const { customerSchema, customerUpdatedSchema } = require('../../src/schema/CustomerSchema.schema')
const { customer, updatedCustomer } = require('../../src/testObjects/toyCustomer')
const { url } = require('../../src/testObjects/env')

const baseUrl = url.base_url_api;

describe("Customer API requests", function() {
  let custName = customer.name;
  let custUserName = customer.username;
  let custId;
  let resCustomer;
  let notId = -1;

  describe('Creating a customer', function() {
    it('A customer should be created', async function() {
      const response = await post(`${baseUrl}/customer/`)
        .set("User-Agent", "agent")
        .send(customer);

      expect(response.status).to.equal(StatusCodes.CREATED);
      expect(response.body).to.have.property("customerId");
      custId = response.body.customerId;
    });
    it('Error response if invalid customer', async function() {
      try {
        await post(`${baseUrl}/customer/`)
          .set("User-Agent", "agent")
          .send(customer);
      } catch (error) {
        expect(error.response.status).to.equal(StatusCodes.CONFLICT)
        expect(error.response.body.errorMessage).to.equal(`A customer with username ${custUserName} already exists.`);
      };
    });
  });

  describe('Getting a customer', function() {
    describe('Getting customer by Id', function() {
      it('A customer should be prompted', async function() {
        resCustomer = await get(`${baseUrl}/customer/${custId}/`)
          .set('User-Agent', 'agent');

        expect(resCustomer.status).to.equal(StatusCodes.OK);
        expect(resCustomer.body).to.be.jsonSchema(customerSchema);
        expect(resCustomer.body).to.have.property("customerIf");
        expect(resCustomer.body.customerIf).to.equal(custId);
      });

      it('Error response if customer does not exist', async () => {
        try {
          await get(`${baseUrl}/customer/${notId}/`)
            .set("User-Agent", "agent");
        } catch (error) {
          expect(error.response.status).to.equal(StatusCodes.NOT_FOUND);
          expect(error.response.body.errorMessage).to.equal(`Customer with id ${notId} not found`);
        };
      });
    });

    describe('Getting customer by name', function() {
      let noName = "nameDoesNotExistsBetterBeSure";
      it('A customer should be prompted', async function() {
        resCustomer = await get(`${baseUrl}/customer/name=${custName}`)
          .set('User-Agent', 'agent');

        expect(resCustomer.status).to.equal(StatusCodes.OK);
        expect(resCustomer.body).to.be.jsonSchema(customerSchema);
        expect(resCustomer.body).to.have.property('name');
        expect(resCustomer.body.name).to.equal(custName);
      });
      it('Error response if customer does not exist', async function() {
        try {
          await get(`${baseUrl}/customer/name=${noName}`)
            .set('User-Agent', 'agent');
        } catch (error) {
          expect(error.response.status).to.equal(StatusCodes.NOT_FOUND);
          expect(error.response.body.errorMessage).to.equal(`Customer with name ${noName} not found`);
        };
      });
    });

    describe('Getting customer by username', function() {
      let noUserName = "userNameDoesNotExistsBetterBeSure";
      it('A customer should be prompted', async function() {
        resCustomer = await get(`${baseUrl}/customer/username=${custUserName}`)
          .set('User-Agent', 'agent');

        expect(resCustomer.status).to.equal(StatusCodes.OK);
        expect(resCustomer.body).to.be.jsonSchema(customerSchema);
        expect(resCustomer.body).to.have.property('username');
        expect(resCustomer.body.username).to.equal(custUserName);
      });
      it('Error response if customer does not exist', async function() {
        try {
          await get(`${baseUrl}/customer/name=${noUserName}`)
            .set('User-Agent', 'agent');
        } catch (error) {
          expect(error.response.status).to.equal(StatusCodes.NOT_FOUND);
          expect(error.response.body.errorMessage).to.equal(`Customer with name ${noUserName} not found`);
        };
      });
    });
  });

  describe('Updating a customer', async function() {

    it('A customer should be updated', async function() {
      const response = await put(`${baseUrl}/customer/${custId}/`)
        .set('User-Agent', 'agent')
        .send(updatedCustomer);

      expect(response.status).to.equal(StatusCodes.OK);
      expect(response.body).to.be.jsonSchema(customerUpdatedSchema);
      expect(response.body.address).to.equal(updatedCustomer.address);
      expect(response.body.phone).to.equal(updatedCustomer.phone);
      expect(response.body.password).to.equal(updatedCustomer.password);
      expect(response.body.username).to.equal(custUserName);
    });
    it('Error response if customer does not exist', async function() {
      try {
        await put(`${baseUrl}/customer/${notId}/`)
          .set('User-Agent', 'agent')
          .send(updatedCustomer);
      } catch (error) {
        expect(error.response.status).to.equal(StatusCodes.NOT_FOUND);
        expect(error.response.body.errorMessage).to.equal(`Unable to upate. Customer with id ${notId} not found.`)
      };
    });
  });

  describe('Deleting a customer', function() {
    it('A customer should be deleted', async function() {
      const response = await del(`${baseUrl}/customer/${custId}/`)
        .set('User-Agent', 'agent');

      expect(response.status).to.equal(StatusCodes.NO_CONTENT);
    });
    it('Error response if customer does not exist', async function() {
      try {
        await del(`${baseUrl}/customer/${notId}/`)
          .set('User-Agent', 'agent');
      } catch (error) {
        expect(error.response.status).to.equal(StatusCodes.NOT_FOUND);
        expect(error.response.body.errorMessage).to.equal(`Unable to delete. Customer with id ${notId} not found.`);
      };
    });
  });
});

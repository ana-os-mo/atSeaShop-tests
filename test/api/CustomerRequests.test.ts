import { post, get, Response } from 'superagent';
import { StatusCodes } from 'http-status-codes';
import * as chai from 'chai';
import * as chaiJSchema from 'chai-json-schema';

chai.use(chaiJSchema);
const { expect } = chai;
const { customerSchema } = require('../../src/schema/CustomerSchema.schema')

const baseUrl = 'http://localhost:8080/api';

const customer = {
  "customerId" : 0,
  "name"       : "Sally Vallery",
  "address"    : "144 Townsend, San Francisco 99999",
  "email"      : "sally@example.com",
  "phone"      : "513 222 5555",
  "username"   : "sallyv",
  "password"   : "sallypassword",
  "enabled"    : "true",
  "role"       : "USER"
};

describe("Customer API requests", function() {
  let custName = customer.name;
  let custUserName = customer.username;
  let custId: any;
  let resCustomer: Response;

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
        expect(error.response?.status).to.equal(StatusCodes.CONFLICT)
      };
    });
  });

  describe('Getting a customer', function() {
    describe('Getting customer by Id', function() {
      let notId = -1;
      it('A customer should be prompted', async function() {
        resCustomer = await get(`${baseUrl}/customer/${custId}/`)
          .set('User-Agent', 'agent');

        expect(resCustomer.status).to.equal(StatusCodes.OK);
        expect(resCustomer.body).to.have.property("customerIf");
        expect(resCustomer.body.customerIf).to.equal(custId);
      });

      it('Validate customer schema by Id', function() {
        expect(resCustomer.body).to.be.jsonSchema(customerSchema);
      });

      it('Error response if customer does not exist', async () => {
        try {
          await get(`${baseUrl}/customer/${notId}/`)
            .set("User-Agent", "agent");
        } catch (error) {
          expect(error.response?.status).to.equal(StatusCodes.NOT_FOUND)
        };
      });
    });

    describe('Getting customer by name', function() {
      let noName = "nameDoesNotExistsBetterBeSure";
      it('A customer should be prompted', async function() {
        resCustomer = await get(`${baseUrl}/customer/name=${custName}`)
          .set('User-Agent', 'agent');

        expect(resCustomer.status).to.equal(StatusCodes.OK);
        expect(resCustomer.body).to.have.property('name');
        expect(resCustomer.body.name).to.equal(custName);
      });

      it('Validate customer schema by name', function() {
        expect(resCustomer.body).to.be.jsonSchema(customerSchema);
      });

      it('Error response if customer does not exist', async function() {
        try {
          await get(`${baseUrl}/customer/name=${noName}`)
            .set('User-Agent', 'agent');
        } catch (error) {
          expect(error.response?.status).to.equal(StatusCodes.NOT_FOUND)
        };
      });
    });

    describe('Getting customer by username', function() {
      let noUserName = "userNameDoesNotExistsBetterBeSure";
      it('A customer should be prompted', async function() {
        resCustomer = await get(`${baseUrl}/customer/username=${custUserName}`)
          .set('User-Agent', 'agent');

        expect(resCustomer.status).to.equal(StatusCodes.OK);
        expect(resCustomer.body).to.have.property('username');
        expect(resCustomer.body.username).to.equal(custUserName);
      });

      it('Validate customer schema by username', function() {
        expect(resCustomer.body).to.be.jsonSchema(customerSchema);
      });

      it('Error response if customer does not exist', async function() {
        try {
          await get(`${baseUrl}/customer/name=${noUserName}`)
            .set('User-Agent', 'agent');
        } catch (error) {
          expect(error.response?.status).to.equal(StatusCodes.NOT_FOUND)
        };
      });
    });
  });

  describe('Updating a customer', function() {
    // pending test below
    it('A customer should be updated');
  });

  describe('Deleting a customer', function() {
    // pending test below
    it('A customer should be deleted');
  });
});

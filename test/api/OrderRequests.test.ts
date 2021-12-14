import { post, get, del } from 'superagent';
import { StatusCodes } from 'http-status-codes';
import * as chai from 'chai';
import * as chaiJSchema from 'chai-json-schema';

chai.use(chaiJSchema);
const { expect } = chai;
const { orderSchema, ordersListSchema } = require('../../src/schema/OrderSchema.schema')
const { toyOrder, customerForOrder } = require('../../src/testObjects/toyOrders')
const { url } = require('../../src/testObjects/env')

const baseUrl = url.base_url_api;

describe("Order API requests", function() {
  let custId;
  let orderId;
  let notId = -1;

  describe('Creating an order', function() {
    it('A customer should be created', async function() {
      const response = await post(`${baseUrl}/customer/`)
        .set("User-Agent", "agent")
        .send(customerForOrder);

      expect(response.status).to.equal(StatusCodes.CREATED);
      expect(response.body).to.have.property("customerId");
      custId = response.body.customerId;
    });
    it('An order should be created', async function() {
      const response = await post(`${baseUrl}/order/`)
        .set("User-Agent", "agent")
        .send(toyOrder);

      expect(response.status).to.equal(StatusCodes.CREATED);
      expect(response.body).to.have.property("orderId");
      orderId = response.body.orderId;
    });
    it('Error response if invalid order', async function() {
      try {
        await post(`${baseUrl}/order/`)
          .set("User-Agent", "agent")
          .send(toyOrder);
      } catch (error) {
        expect(error.response.status).to.equal(StatusCodes.CONFLICT)
        expect(error.response.body.errorMessage).to.equal(`Unable to create. An order with id ${orderId} already exists.`);
      };
    });
  });

  describe('Getting orders', function() {
    describe('Getting an order by Id', function() {
      it('An order should be shown', async function() {
        const response = await get(`${baseUrl}/order/${orderId}/`)
          .set('User-Agent', 'agent');

        expect(response.status).to.equal(StatusCodes.OK);
        expect(response.body).to.be.jsonSchema(orderSchema);
        expect(response.body).to.have.property("customerId");
        expect(response.body).to.have.property("orderId");
        expect(response.body.orderId).to.equal(orderId);
      });
      it('Error response if order does not exist', async () => {
        try {
          await get(`${baseUrl}/order/${notId}/`)
            .set("User-Agent", "agent");
        } catch (error) {
          expect(error.response.status).to.equal(StatusCodes.NOT_FOUND);
          expect(error.response.body.errorMessage).to.equal(`Order with id ${notId} not found`);
        };
      });
    });
    describe('Getting all orders', function() {
      it('All orders should be listed', async function() {
        const response = await get(`${baseUrl}/order/`)
          .set('User-Agent', 'agent');

        expect(response.status).to.equal(StatusCodes.OK);
        expect(response.body).to.be.jsonSchema(ordersListSchema);
        expect(response.body.length).to.be.gt(0);
      });
    });
  });

  describe('Deleting order and customer', function() {
    // let tOrId = toyOrder.orderId;
    it('An order should be deleted', async function() {
      const response = await del(`${baseUrl}/order/${orderId}/`)
        .set('User-Agent', 'agent');

      expect(response.status).to.equal(StatusCodes.NO_CONTENT);
    });
    it('Error response if order does not exist', async function() {
      try {
        await del(`${baseUrl}/order/${notId}/`)
          .set('User-Agent', 'agent');
      } catch (error) {
        expect(error.response.status).to.equal(StatusCodes.NOT_FOUND);
        expect(error.response.body.errorMessage).to.equal(`Unable to delete order. Order with id ${notId} not found.`);
      };
    });
    it('A customer should be deleted', async function() {
      const response = await del(`${baseUrl}/customer/${custId}/`)
        .set('User-Agent', 'agent');

      expect(response.status).to.equal(StatusCodes.NO_CONTENT);
    });
  });
});

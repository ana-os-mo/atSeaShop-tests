import { get } from 'superagent';
import { StatusCodes } from 'http-status-codes';
import * as chai from 'chai';
import * as chaiJSchema from 'chai-json-schema';

chai.use(chaiJSchema);
const { expect } = chai;
const { productSchema, productListSchema } = require('../../src/schema/ProductListSchema.schema')

const baseUrl = 'http://localhost:8080/api';

describe('Product API requests', function() {
  describe('Getting all products', function() {
    it('All products must be shown', async function() {
      const response = await get(`${baseUrl}/product/`)
        .set('User-Agent', 'agent');

      expect(response.status).to.equal(StatusCodes.OK);
      expect(response.body).to.be.jsonSchema(productListSchema);
      expect(response.body.length).to.be.gt(0);
    });
    // Error: HTTP 204 NO_CONTENT
  });
  describe('Getting a single product', function() {
    let prodId = 6;
    let noId = -1;
    it('A product must be shown', async function() {
      const response = await get(`${baseUrl}/product/${prodId}/`)
        .set('User-Agent', 'agent');

      expect(response.status).to.equal(StatusCodes.OK);
      expect(response.body).to.be.jsonSchema(productSchema);
      expect(response.body).to.have.property("price");
      expect(response.body).to.have.property("productId");
    });
    it('Error response if product does not exists', async function() {
      try {
        await get(`${baseUrl}/product/${noId}/`)
          .set("User-Agent", "agent");
      } catch (error) {
        expect(error.response.status).to.equal(StatusCodes.NOT_FOUND)
        expect(error.response.body.errorMessage).to.equal(`Product with id ${noId} not found`);
      };
    });
  });
});

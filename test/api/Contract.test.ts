import { get, Response } from 'superagent';
import * as chai from 'chai';
import * as chaiJSchema from 'chai-json-schema';
const { productListSchema, productSchema } = require('../../src/schema/ProductListSchema.schema')
const { url } = require('../../src/testObjects/env')

chai.use(chaiJSchema);
const { expect } = chai;

const baseUrl = url.base_url_api;

describe('Scheme validations', function() {
  let resProductList: Response;
  let resProduct: Response;
  const prodId = 2;

  before(async function() {
    resProductList = await get(`${baseUrl}/product/`);
    resProduct = await get(`${baseUrl}/product/${prodId}/`);
  });

  it('Product schema validation', function() {
    expect(resProduct.body).to.be.jsonSchema(productSchema);
  });
  it('Product list schema validation', function() {
    expect(resProductList.body).to.be.jsonSchema(productListSchema);
  });
});

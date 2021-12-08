const productSchema = {
  title: 'Product',
  description: 'A product from atsea shop',
  type: 'object',
  required: ['productId','name','price','description','image'],
  properties: {
    productId: {
      description: 'The unique identifier for a product',
      type: 'integer',
      minimum: 0
    },
    name: {
      description: 'Name of the product',
      type: 'string'
    },
    price: {
      description: 'The price of the product',
      type: 'number',
      exclusiveMinimum: 0
    },
    description: {
      description: 'Description of the product',
      type: 'string'
    },
    image: {
      description: 'An ilustrative image of the product',
      type: 'string'
    }
  }
}

const productListSchema = {
  title: 'Product list',
  description: 'List of products from atsea shop',
  type: 'array',
  items: [{ ...productSchema }]
}

exports.productSchema = productSchema;
exports.productListSchema = productListSchema;

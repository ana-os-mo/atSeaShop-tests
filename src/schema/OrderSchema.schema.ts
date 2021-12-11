const orderSchema = {
  title: 'Order',
  description: 'An order made by a customer',
  type: 'object',
  required: ['orderId', 'customerId', 'productsOrdered'],
  properties: {
    orderId: {
      description: 'The unique identifier for an order',
      type: 'integer'
    },
    orderDate: {
      description: 'Date when order was placed or updated',
      type: 'string'
    },
    customerId: {
      description:'ID of the customer who made the order',
      type: 'number'
    },
    productsOrdered: {
      description: 'List of products ordered by the customer',
      type: 'object'
    }
  }
}

const ordersListSchema = {
  title: 'Orders list',
  description: 'List of orders made at atsea shop',
  type: 'array',
  items: [{ ...orderSchema }]
}

exports.orderSchema = orderSchema;
exports.ordersListSchema = ordersListSchema;

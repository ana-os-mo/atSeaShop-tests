const customerSchema = {
  title: 'Customer',
  description: 'A customer at atsea shop',
  type: 'object',
  required: ['customerIf','name','address','email','username','phone'],
  properties: {
    customerIf: {
      description: 'The unique identifier for a customer',
      type: 'integer'
    },
    name: {
      description: 'Name of a customer',
      type: 'string'
    },
    address: {
      description: 'The address of a customer',
      type: 'string'
    },
    email: {
      description: 'Customer\'s email',
      type: 'string'
    },
    username: {
      description: 'A unique username for a customer',
      type: 'string'
    },
    phone: {
      description: 'A customer\'s phone number',
      type: 'string'
    },
    password: {
      description: 'A customer\'s password for personal account (won\'t show for security)',
      type: ['string', 'number']
    },
    enabled: {
      description: 'Customer state in the system',
      type: 'boolean'
    },
    role: {
      description: 'A customer\'s role must be USER',
      type: 'string'
    }
  }
}

const customerListSchema = {
  title: 'Customers list',
  description: 'List of customers at atsea shop',
  type: 'array',
  items: [{ ...customerSchema }]
}

exports.customerListSchema = customerListSchema;
exports.customerSchema = customerSchema;

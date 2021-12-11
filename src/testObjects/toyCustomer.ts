const customer = {
  "customerId": 0,
  "name": "Sally Vallery",
  "address": "144 Townsend, San Francisco 99999",
  "email": "sally@example.com",
  "phone": "513 222 5555",
  "username": "sallyv",
  "password": "sallypassword",
  "enabled": "true",
  "role": "USER"
};

const updatedCustomer = {
  "customerId": 0,
  "name": "Sally Vallery",
  "address": "my new address",
  "email": "sally@example.com",
  "phone": "phone as string",
  "username": "sallyv",
  "password": "sallynewpassword",
  "enabled": "true",
  "role": "USER"
};

exports.customer = customer;
exports.updatedCustomer = updatedCustomer;

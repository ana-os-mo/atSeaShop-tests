const toyOrder = {
  "orderId": 1,
  "customerId": 54321,
  "productsOrdered": {"1":1, "2":1, "3":1}
};

const customerForOrder = {
  "customerId": 54321,
  "name": "Elver Gomez T",
  "address": "far away",
  "email": "torba@example.com",
  "phone": "123 432 4545",
  "username": "elverGT",
  "password": "guessWho",
  "enabled": "true",
  "role": "USER"
};

const credentialsForOrder = {
  username: 'elverGT',
  password: 'guessWho'
}

const invalidCredentials = {
  username: "elverGT",
  password: "gAtItO"
}

exports.toyOrder = toyOrder;
exports.customerForOrder = customerForOrder;
exports.credentialsForOrder = credentialsForOrder;
exports.invalidCredentials = invalidCredentials;

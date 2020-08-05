"use strict";

var jwt = require('jsonwebtoken');

var isAuthenticated = function isAuthenticated(req) {
  if (req.method === 'OPTIONS' || !req.url.startsWith('/api/')) {
    return true;
  }

  try {
    var token = req.headers.authorization.split(' ')[1]; // Authorization: 'Bearer TOKEN'

    if (!token) {
      return false;
    }

    var decodedToken = jwt.verify(token, process.env.JWT_KEY);
    req.userId = decodedToken.userId;
    return true;
  } catch (err) {
    return false;
  }
};

module.exports = isAuthenticated;
//# sourceMappingURL=check-auth.js.map
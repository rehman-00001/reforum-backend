const jwt = require('jsonwebtoken');
const serverConfig = require('../../config/serverConfig');

const isAuthenticated = (req) => {
  if (req.method === 'OPTIONS' || !req.url.startsWith('/api/')) {
    return true;
  }

  try {
    const token = req.headers.authorization.split(' ')[1]; // Authorization: 'Bearer TOKEN'
    if (!token) {
      return false;
    }
    const decodedToken = jwt.verify(token, serverConfig.JWT_KEY);
    req.userId = decodedToken.userId;
    return true;
  } catch (err) {
    return false;
  }
};

module.exports = isAuthenticated;

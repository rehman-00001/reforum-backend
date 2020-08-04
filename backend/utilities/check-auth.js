const jwt = require('jsonwebtoken');

const isAuthenticated = (req) => {
  if (req.method === 'OPTIONS' || !req.url.startsWith('/api/')) {
    return true;
  }

  try {
    const token = req.headers.authorization.split(' ')[1]; // Authorization: 'Bearer TOKEN'
    if (!token) {
      return false;
    }
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    req.userId = decodedToken.userId;
    return true;
  } catch (err) {
    return false;
  }
};

module.exports = isAuthenticated;

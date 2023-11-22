const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware  = (req, res, next) => {

  const header = req.headers['authorization'];
  const token = header && header.split(" ")[1];
  const secret = process.env.SECRET_JWT;
  
  if (!token) {
    return res.status(401).json({ message: 'token not found' });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'invalid token' });
    }
    next();
  });
}


module.exports = authMiddleware;
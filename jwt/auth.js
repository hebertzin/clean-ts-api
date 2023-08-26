const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware  = (req, res, next) => {

  const header = req.headers['authorization'];
  const token = header && header.split(" ")[1];
  const secret = process.env.SECRET_JWT;
  
  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido.' });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'forncer um token valido.' });
    }
    
    next();
  });
}


module.exports = authMiddleware;
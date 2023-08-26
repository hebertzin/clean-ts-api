const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateJwt = (id) => {
  const token = jwt.sign({ id }, process.env.SECRET_JWT, { expiresIn: '1m'})
  return token.toString();
}

module.exports = {
    generateJwt
}
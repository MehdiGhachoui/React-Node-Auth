const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/jwt')


module.exports.proxy = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH , OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, x-auth-token , Content-Type, Accept, Authorization');
  next();

}

module.exports.auth = (req, res, next) => {

  //check token :
  let token = req.header('x-auth-token');

  // verify token :
  if(!token) return res.json({msg : "access  denied"});

  try {

      let decoded = jwt.verify(token , JWT_SECRET);
      req.user = decoded.user;

      next()

  } catch (error) {
      return res.status(402).json({msg : "token not valid"})
  }

}

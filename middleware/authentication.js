const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.header('x-auth-token');

  if (!token) return res.status(401).json({msg: 'Please provide a token for authentication'});

  try {
    // Throws error if token invalid/expired
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    next();
  } catch (error) {
    res.status(401).json({msg: 'Invalid token'});
  }
}

module.exports = auth;
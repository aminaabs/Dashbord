const jwt = require('jsonwebtoken');

function optionalAuth(req, _res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next();
  }
  const token = authHeader.split(' ')[1];
  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) return next();
    const payload = jwt.verify(token, secret);
    req.user = payload; // { id, role, name, email }
  } catch (_err) {
    // ignore invalid token for optional auth
  }
  return next();
}

module.exports = optionalAuth;

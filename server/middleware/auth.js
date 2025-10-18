const jwt = require('jsonwebtoken');

function auth(requiredRole) {
  return function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Missing or invalid Authorization header' });
    }

    const token = authHeader.split(' ')[1];

    try {
      const secret = process.env.JWT_SECRET;
      if (!secret) return res.status(500).json({ message: 'Server misconfigured: JWT_SECRET missing' });

      const payload = jwt.verify(token, secret);
      req.user = payload; // { id, role, name, email }

      if (requiredRole && payload.role !== requiredRole) {
        return res.status(403).json({ message: 'Forbidden' });
      }

      return next();
    } catch (err) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
  };
}

module.exports = auth;

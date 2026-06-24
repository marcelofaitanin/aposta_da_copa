const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Middleware que valida o token JWT enviado no cabeçalho:
 *   Authorization: Bearer <token>
 * Se válido, anexa o usuário em req.user.
 */
async function authRequired(req, res, next) {
  try {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;
    if (!token) {
      return res.status(401).json({ message: 'Token não fornecido.' });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.id);
    if (!user) {
      return res.status(401).json({ message: 'Usuário não encontrado.' });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido ou expirado.' });
  }
}

/**
 * Middleware que exige que o usuário autenticado seja administrador.
 * Deve ser usado depois de authRequired.
 */
function adminRequired(req, res, next) {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Acesso restrito a administradores.' });
  }
  next();
}

module.exports = { authRequired, adminRequired };

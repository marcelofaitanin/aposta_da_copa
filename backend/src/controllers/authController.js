const jwt = require('jsonwebtoken');
const User = require('../models/User');

function signToken(user) {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
}

/** POST /api/auth/register  -> cria conta e já retorna token */
async function register(req, res) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Nome, e-mail e senha são obrigatórios.' });
    }

    const exists = await User.findOne({ email: email.toLowerCase() });
    if (exists) {
      return res.status(409).json({ message: 'E-mail já cadastrado.' });
    }

    const user = new User({ name, email });
    user.setPassword(password);
    await user.save();

    return res.status(201).json({ token: signToken(user), user });
  } catch (err) {
    return res.status(500).json({ message: 'Erro ao registrar usuário.', error: err.message });
  }
}

/** POST /api/auth/login -> autentica e retorna token */
async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: (email || '').toLowerCase() });
    if (!user || !user.validatePassword(password || '')) {
      return res.status(401).json({ message: 'E-mail ou senha inválidos.' });
    }
    return res.json({ token: signToken(user), user });
  } catch (err) {
    return res.status(500).json({ message: 'Erro ao fazer login.', error: err.message });
  }
}

/** GET /api/auth/me -> retorna o usuário autenticado */
async function me(req, res) {
  return res.json({ user: req.user });
}

module.exports = { register, login, me };

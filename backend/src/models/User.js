const { mongoose } = require('../config/db');
const bcrypt = require('bcryptjs');

/**
 * Coleção: users
 * Representa o apostador (ou administrador) do sistema.
 */
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    // Saldo de "moedas" virtuais para apostar (sem dinheiro real)
    balance: { type: Number, default: 1000, min: 0 },
  },
  { timestamps: true }
);

// Define a senha (gera o hash). Uso: user.setPassword('123456')
userSchema.methods.setPassword = function (plainPassword) {
  this.passwordHash = bcrypt.hashSync(plainPassword, 10);
};

// Confere a senha no login
userSchema.methods.validatePassword = function (plainPassword) {
  return bcrypt.compareSync(plainPassword, this.passwordHash);
};

// Remove o hash da senha ao converter para JSON (nunca expõe na API)
userSchema.set('toJSON', {
  transform: (_doc, ret) => {
    delete ret.passwordHash;
    delete ret.__v;
    return ret;
  },
});

module.exports = mongoose.model('User', userSchema);

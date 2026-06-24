const { mongoose } = require('../config/db');

/**
 * Coleção: bets
 * Representa uma aposta feita por um usuário em um jogo.
 */
const betSchema = new mongoose.Schema(
  {
    // Referência ao usuário que apostou
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    // Referência ao jogo apostado
    game: { type: mongoose.Schema.Types.ObjectId, ref: 'Game', required: true },

    // Palpite do usuário: vitória da casa, empate ou vitória do visitante
    pick: { type: String, enum: ['home', 'draw', 'away'], required: true },

    // Valor apostado (em moedas virtuais)
    amount: { type: Number, required: true, min: 1 },

    // Cotação registrada no momento da aposta (congelada, não muda depois)
    oddAtBet: { type: Number, required: true, min: 1 },

    // Situação da aposta
    status: {
      type: String,
      enum: ['pendente', 'ganha', 'perdida'],
      default: 'pendente',
    },

    // Quanto o usuário recebeu se ganhou (amount * oddAtBet), senão 0
    payout: { type: Number, default: 0 },
  },
  { timestamps: true }
);

betSchema.set('toJSON', {
  transform: (_doc, ret) => {
    delete ret.__v;
    return ret;
  },
});

module.exports = mongoose.model('Bet', betSchema);

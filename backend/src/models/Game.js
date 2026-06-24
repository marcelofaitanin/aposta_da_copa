const { mongoose } = require('../config/db');

/**
 * Coleção: games
 * Representa um jogo da Copa do Mundo 2026 e as cotações (odds) de aposta.
 */
const gameSchema = new mongoose.Schema(
  {
    // Time da casa / mandante
    homeTeam: { type: String, required: true, trim: true },
    // Time visitante
    awayTeam: { type: String, required: true, trim: true },

    // Fase do torneio
    stage: {
      type: String,
      enum: [
        'Fase de Grupos',
        'Rodada de 32',
        'Oitavas de Final',
        'Quartas de Final',
        'Semifinal',
        'Disputa de 3º Lugar',
        'Final',
      ],
      default: 'Fase de Grupos',
    },
    group: { type: String, trim: true }, // ex.: "Grupo A" (nulo no mata-mata)

    // Local da partida
    stadium: { type: String, trim: true },
    city: { type: String, trim: true },

    // Data e hora do jogo (sempre >= 25/06/2026)
    matchDate: { type: Date, required: true },

    // Cotações (quanto multiplica o valor apostado se acertar)
    odds: {
      home: { type: Number, required: true, min: 1 },
      draw: { type: Number, required: true, min: 1 },
      away: { type: Number, required: true, min: 1 },
    },

    // Situação do jogo
    status: {
      type: String,
      enum: ['agendado', 'encerrado'],
      default: 'agendado',
    },

    // Placar e resultado (preenchidos quando o jogo encerra)
    score: {
      home: { type: Number, default: null },
      away: { type: Number, default: null },
    },
    // Resultado vencedor: 'home' | 'draw' | 'away' | null (ainda não definido)
    result: {
      type: String,
      enum: ['home', 'draw', 'away', null],
      default: null,
    },
  },
  { timestamps: true }
);

gameSchema.set('toJSON', {
  transform: (_doc, ret) => {
    delete ret.__v;
    return ret;
  },
});

module.exports = mongoose.model('Game', gameSchema);

const Bet = require('../models/Bet');
const Game = require('../models/Game');
const User = require('../models/User');

/**
 * POST /api/bets  (usuário autenticado)
 * Cria uma aposta: valida saldo, congela a odd atual e debita o valor apostado.
 */
async function createBet(req, res) {
  try {
    const { gameId, pick, amount } = req.body;

    if (!gameId || !pick || !amount) {
      return res.status(400).json({ message: 'Informe gameId, pick e amount.' });
    }
    if (!['home', 'draw', 'away'].includes(pick)) {
      return res.status(400).json({ message: 'pick deve ser home, draw ou away.' });
    }
    if (amount <= 0) {
      return res.status(400).json({ message: 'O valor da aposta deve ser positivo.' });
    }

    const game = await Game.findById(gameId);
    if (!game) return res.status(404).json({ message: 'Jogo não encontrado.' });
    if (game.status !== 'agendado') {
      return res.status(409).json({ message: 'Não é possível apostar em jogo encerrado.' });
    }
    if (new Date(game.matchDate) <= new Date()) {
      return res.status(409).json({ message: 'O jogo já começou; apostas encerradas.' });
    }

    const user = await User.findById(req.user._id);
    if (user.balance < amount) {
      return res.status(400).json({ message: 'Saldo insuficiente.' });
    }

    const oddAtBet = game.odds[pick];

    // Debita o saldo e cria a aposta
    user.balance -= amount;
    await user.save();

    const bet = await Bet.create({
      user: user._id,
      game: game._id,
      pick,
      amount,
      oddAtBet,
    });

    const populated = await bet.populate('game');
    return res.status(201).json({ bet: populated, balance: user.balance });
  } catch (err) {
    return res.status(500).json({ message: 'Erro ao criar aposta.', error: err.message });
  }
}

/** GET /api/bets/me -> apostas do usuário autenticado */
async function myBets(req, res) {
  try {
    const bets = await Bet.find({ user: req.user._id })
      .populate('game')
      .sort({ createdAt: -1 });
    return res.json(bets);
  } catch (err) {
    return res.status(500).json({ message: 'Erro ao listar apostas.', error: err.message });
  }
}

module.exports = { createBet, myBets };

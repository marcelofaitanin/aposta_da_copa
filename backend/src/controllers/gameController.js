const Game = require('../models/Game');
const Bet = require('../models/Bet');
const User = require('../models/User');
const { mongoose } = require('../config/db');

/** GET /api/games -> lista jogos (filtro opcional ?status=agendado&stage=...) */
async function listGames(req, res) {
  try {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    if (req.query.stage) filter.stage = req.query.stage;

    const games = await Game.find(filter).sort({ matchDate: 1 });
    return res.json(games);
  } catch (err) {
    return res.status(500).json({ message: 'Erro ao listar jogos.', error: err.message });
  }
}

/** GET /api/games/:id -> detalhe de um jogo */
async function getGame(req, res) {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) return res.status(404).json({ message: 'Jogo não encontrado.' });
    return res.json(game);
  } catch (err) {
    return res.status(500).json({ message: 'Erro ao buscar jogo.', error: err.message });
  }
}

/** POST /api/games -> cria jogo (admin) */
async function createGame(req, res) {
  try {
    const game = await Game.create(req.body);
    return res.status(201).json(game);
  } catch (err) {
    return res.status(400).json({ message: 'Erro ao criar jogo.', error: err.message });
  }
}

/** PUT /api/games/:id -> atualiza jogo (admin) */
async function updateGame(req, res) {
  try {
    const game = await Game.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!game) return res.status(404).json({ message: 'Jogo não encontrado.' });
    return res.json(game);
  } catch (err) {
    return res.status(400).json({ message: 'Erro ao atualizar jogo.', error: err.message });
  }
}

/**
 * POST /api/games/:id/result  (admin)
 * Registra o placar, encerra o jogo e liquida (resolve) todas as apostas:
 *  - apostas certas viram "ganha" e creditam payout = amount * oddAtBet no saldo;
 *  - apostas erradas viram "perdida".
 */
async function settleGame(req, res) {
  try {
    const { homeScore, awayScore } = req.body;
    if (homeScore == null || awayScore == null) {
      return res.status(400).json({ message: 'Informe homeScore e awayScore.' });
    }

    const game = await Game.findById(req.params.id);
    if (!game) return res.status(404).json({ message: 'Jogo não encontrado.' });
    if (game.status === 'encerrado') {
      return res.status(409).json({ message: 'Jogo já foi encerrado.' });
    }

    const result =
      homeScore > awayScore ? 'home' : homeScore < awayScore ? 'away' : 'draw';

    game.score = { home: homeScore, away: awayScore };
    game.result = result;
    game.status = 'encerrado';
    await game.save();

    // Liquida apostas pendentes deste jogo
    const bets = await Bet.find({ game: game._id, status: 'pendente' });
    let resolved = 0;
    for (const bet of bets) {
      if (bet.pick === result) {
        bet.status = 'ganha';
        bet.payout = Math.round(bet.amount * bet.oddAtBet * 100) / 100;
        await bet.save();
        await User.findByIdAndUpdate(bet.user, { $inc: { balance: bet.payout } });
      } else {
        bet.status = 'perdida';
        bet.payout = 0;
        await bet.save();
      }
      resolved++;
    }

    return res.json({ game, apostasLiquidadas: resolved });
  } catch (err) {
    return res.status(500).json({ message: 'Erro ao encerrar jogo.', error: err.message });
  }
}

module.exports = { listGames, getGame, createGame, updateGame, settleGame };

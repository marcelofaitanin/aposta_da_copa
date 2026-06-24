const express = require('express');
const router = express.Router();
const {
  listGames,
  getGame,
  createGame,
  updateGame,
  settleGame,
} = require('../controllers/gameController');
const { authRequired, adminRequired } = require('../middleware/auth');

// Públicas (qualquer um pode ver os jogos e as cotações)
router.get('/', listGames);
router.get('/:id', getGame);

// Restritas a administradores
router.post('/', authRequired, adminRequired, createGame);
router.put('/:id', authRequired, adminRequired, updateGame);
router.post('/:id/result', authRequired, adminRequired, settleGame);

module.exports = router;

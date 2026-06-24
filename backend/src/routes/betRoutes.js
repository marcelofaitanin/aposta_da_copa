const express = require('express');
const router = express.Router();
const { createBet, myBets } = require('../controllers/betController');
const { authRequired } = require('../middleware/auth');

// Todas exigem usuário autenticado
router.post('/', authRequired, createBet);
router.get('/me', authRequired, myBets);

module.exports = router;

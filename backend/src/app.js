const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const gameRoutes = require('./routes/gameRoutes');
const betRoutes = require('./routes/betRoutes');

/**
 * Monta e configura a aplicação Express (sem subir o servidor).
 * Separado do server.js para facilitar testes.
 */
function createApp() {
  const app = express();

  app.use(
    cors({
      origin: process.env.CORS_ORIGIN || 'http://localhost:4200',
    })
  );
  app.use(express.json());

  // Healthcheck simples
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'copa-apostas-backend' });
  });

  // Rotas da aplicação
  app.use('/api/auth', authRoutes);
  app.use('/api/games', gameRoutes);
  app.use('/api/bets', betRoutes);

  // 404 padrão para rotas de API não encontradas
  app.use((req, res) => {
    res.status(404).json({ message: 'Rota não encontrada.' });
  });

  return app;
}

module.exports = createApp;

/**
 * Script de povoamento (seed) do banco.
 *
 * Cria usuários de exemplo e os jogos da Copa do Mundo 2026 a partir de
 * 25/06/2026 (fim da fase de grupos + mata-mata), com sedes reais nos
 * EUA, Canadá e México.
 *
 * Uso:
 *   npm run seed
 */
require('dotenv').config();
const { connectDB, mongoose } = require('../config/db');
const User = require('../models/User');
const Game = require('../models/Game');
const Bet = require('../models/Bet');

// Helper para montar a data/hora do jogo (horário local da sede)
const dt = (iso) => new Date(iso);

const games = [
  // ===================== FASE DE GRUPOS (rodada final) =====================
  {
    homeTeam: 'Brasil',
    awayTeam: 'Croácia',
    stage: 'Fase de Grupos',
    group: 'Grupo F',
    stadium: 'SoFi Stadium',
    city: 'Los Angeles, EUA',
    matchDate: dt('2026-06-25T19:00:00'),
    odds: { home: 1.65, draw: 3.7, away: 5.2 },
  },
  {
    homeTeam: 'Argentina',
    awayTeam: 'Nigéria',
    stage: 'Fase de Grupos',
    group: 'Grupo A',
    stadium: 'Estadio Azteca',
    city: 'Cidade do México, México',
    matchDate: dt('2026-06-25T22:00:00'),
    odds: { home: 1.5, draw: 4.0, away: 6.5 },
  },
  {
    homeTeam: 'França',
    awayTeam: 'Japão',
    stage: 'Fase de Grupos',
    group: 'Grupo C',
    stadium: 'MetLife Stadium',
    city: 'Nova York/Nova Jersey, EUA',
    matchDate: dt('2026-06-26T19:00:00'),
    odds: { home: 1.55, draw: 3.9, away: 6.0 },
  },
  {
    homeTeam: 'Inglaterra',
    awayTeam: 'México',
    stage: 'Fase de Grupos',
    group: 'Grupo B',
    stadium: 'AT&T Stadium',
    city: 'Dallas, EUA',
    matchDate: dt('2026-06-26T21:30:00'),
    odds: { home: 1.8, draw: 3.5, away: 4.2 },
  },
  {
    homeTeam: 'Portugal',
    awayTeam: 'Uruguai',
    stage: 'Fase de Grupos',
    group: 'Grupo D',
    stadium: 'Mercedes-Benz Stadium',
    city: 'Atlanta, EUA',
    matchDate: dt('2026-06-27T19:00:00'),
    odds: { home: 2.0, draw: 3.3, away: 3.6 },
  },
  {
    homeTeam: 'Espanha',
    awayTeam: 'Canadá',
    stage: 'Fase de Grupos',
    group: 'Grupo E',
    stadium: 'BC Place',
    city: 'Vancouver, Canadá',
    matchDate: dt('2026-06-27T22:00:00'),
    odds: { home: 1.4, draw: 4.5, away: 7.0 },
  },

  // ========================= RODADA DE 32 =========================
  {
    homeTeam: 'Brasil',
    awayTeam: 'Equador',
    stage: 'Rodada de 32',
    stadium: 'Hard Rock Stadium',
    city: 'Miami, EUA',
    matchDate: dt('2026-06-28T19:00:00'),
    odds: { home: 1.6, draw: 3.8, away: 5.5 },
  },
  {
    homeTeam: 'Argentina',
    awayTeam: 'Coreia do Sul',
    stage: 'Rodada de 32',
    stadium: 'NRG Stadium',
    city: 'Houston, EUA',
    matchDate: dt('2026-06-29T19:00:00'),
    odds: { home: 1.45, draw: 4.2, away: 6.8 },
  },
  {
    homeTeam: 'França',
    awayTeam: 'Senegal',
    stage: 'Rodada de 32',
    stadium: 'Lincoln Financial Field',
    city: 'Filadélfia, EUA',
    matchDate: dt('2026-07-01T19:00:00'),
    odds: { home: 1.7, draw: 3.6, away: 4.8 },
  },
  {
    homeTeam: 'Espanha',
    awayTeam: 'Estados Unidos',
    stage: 'Rodada de 32',
    stadium: 'Arrowhead Stadium',
    city: 'Kansas City, EUA',
    matchDate: dt('2026-07-03T20:00:00'),
    odds: { home: 1.55, draw: 3.9, away: 5.8 },
  },

  // ========================= OITAVAS DE FINAL =========================
  {
    homeTeam: 'Brasil',
    awayTeam: 'Portugal',
    stage: 'Oitavas de Final',
    stadium: 'Levi\'s Stadium',
    city: 'San Francisco, EUA',
    matchDate: dt('2026-07-04T19:00:00'),
    odds: { home: 2.1, draw: 3.3, away: 3.4 },
  },
  {
    homeTeam: 'Argentina',
    awayTeam: 'Inglaterra',
    stage: 'Oitavas de Final',
    stadium: 'AT&T Stadium',
    city: 'Dallas, EUA',
    matchDate: dt('2026-07-05T19:00:00'),
    odds: { home: 2.4, draw: 3.2, away: 2.9 },
  },
  {
    homeTeam: 'França',
    awayTeam: 'Espanha',
    stage: 'Oitavas de Final',
    stadium: 'MetLife Stadium',
    city: 'Nova York/Nova Jersey, EUA',
    matchDate: dt('2026-07-07T19:00:00'),
    odds: { home: 2.5, draw: 3.2, away: 2.8 },
  },

  // ========================= QUARTAS DE FINAL =========================
  {
    homeTeam: 'Brasil',
    awayTeam: 'Argentina',
    stage: 'Quartas de Final',
    stadium: 'Mercedes-Benz Stadium',
    city: 'Atlanta, EUA',
    matchDate: dt('2026-07-10T20:00:00'),
    odds: { home: 2.6, draw: 3.1, away: 2.7 },
  },
  {
    homeTeam: 'França',
    awayTeam: 'Alemanha',
    stage: 'Quartas de Final',
    stadium: 'SoFi Stadium',
    city: 'Los Angeles, EUA',
    matchDate: dt('2026-07-11T19:00:00'),
    odds: { home: 2.3, draw: 3.2, away: 3.0 },
  },

  // =========================== SEMIFINAL ===========================
  {
    homeTeam: 'Brasil',
    awayTeam: 'França',
    stage: 'Semifinal',
    stadium: 'AT&T Stadium',
    city: 'Dallas, EUA',
    matchDate: dt('2026-07-14T20:00:00'),
    odds: { home: 2.4, draw: 3.2, away: 2.9 },
  },

  // ====================== DISPUTA DE 3º LUGAR ======================
  {
    homeTeam: 'Argentina',
    awayTeam: 'Alemanha',
    stage: 'Disputa de 3º Lugar',
    stadium: 'Hard Rock Stadium',
    city: 'Miami, EUA',
    matchDate: dt('2026-07-18T16:00:00'),
    odds: { home: 2.2, draw: 3.2, away: 3.1 },
  },

  // ============================= FINAL =============================
  {
    homeTeam: 'Brasil',
    awayTeam: 'França',
    stage: 'Final',
    stadium: 'MetLife Stadium',
    city: 'Nova York/Nova Jersey, EUA',
    matchDate: dt('2026-07-19T16:00:00'),
    odds: { home: 2.45, draw: 3.2, away: 2.85 },
  },
];

async function seed() {
  await connectDB();

  // Limpa coleções antes de popular
  await Promise.all([User.deleteMany({}), Game.deleteMany({}), Bet.deleteMany({})]);
  console.log('🧹 Coleções limpas.');

  // Usuários de exemplo
  const admin = new User({ name: 'Administrador', email: 'admin@copa.com', role: 'admin' });
  admin.setPassword('admin123');

  const joao = new User({ name: 'João Apostador', email: 'joao@email.com', balance: 1000 });
  joao.setPassword('123456');

  const maria = new User({ name: 'Maria Silva', email: 'maria@email.com', balance: 1000 });
  maria.setPassword('123456');

  await User.insertMany([admin, joao, maria]);
  console.log('👤 Usuários criados (admin@copa.com / joao@email.com / maria@email.com).');

  // Jogos
  const created = await Game.insertMany(games);
  console.log(`⚽ ${created.length} jogos da Copa 2026 criados (a partir de 25/06/2026).`);

  // Uma aposta de exemplo do João no primeiro jogo
  const primeiroJogo = created[0];
  const aposta = await Bet.create({
    user: joao._id,
    game: primeiroJogo._id,
    pick: 'home',
    amount: 100,
    oddAtBet: primeiroJogo.odds.home,
  });
  await User.findByIdAndUpdate(joao._id, { $inc: { balance: -aposta.amount } });
  console.log('🎟️  Aposta de exemplo criada (João: R$100 na vitória do Brasil).');

  await mongoose.disconnect();
  console.log('✅ Seed concluído com sucesso!');
  process.exit(0);
}

seed().catch((err) => {
  console.error('❌ Erro no seed:', err);
  process.exit(1);
});

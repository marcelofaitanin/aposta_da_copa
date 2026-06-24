/**
 * Script de povoamento (seed) do banco.
 *
 * Cria usuários de exemplo e os jogos da Copa do Mundo 2026 a partir de
 * 25/06/2026, seguindo a tabela oficial publicada pela FIFA:
 *  - 25 a 27/06: rodada final da fase de grupos (seleções reais);
 *  - 28/06 a 19/07: mata-mata (Rodada de 32 até a Final), com o chaveamento
 *    oficial. Os confrontos do mata-mata dependem da classificação, então os
 *    times ainda indefinidos aparecem como "1º Grupo X", "Vice Grupo Y" ou
 *    "Melhor 3º (...)", exatamente como no site da FIFA.
 *
 * Sedes: EUA, Canadá e México. Horários em horário do leste dos EUA (ET).
 *
 * Uso:  npm run seed
 */
require('dotenv').config();
const { connectDB, mongoose } = require('../config/db');
const User = require('../models/User');
const Game = require('../models/Game');
const Bet = require('../models/Bet');

const dt = (iso) => new Date(iso);
// Odds neutras para jogos de mata-mata com confronto ainda indefinido
const ko = (home = 2.4, draw = 3.2, away = 2.8) => ({ home, draw, away });

const games = [
  // =========================================================================
  // FASE DE GRUPOS — rodada final (25 a 27/06/2026)
  // =========================================================================

  // --- 25/06 ---
  {
    homeTeam: 'Equador', awayTeam: 'Alemanha', stage: 'Fase de Grupos', group: 'Grupo E',
    stadium: 'MetLife Stadium', city: 'Nova York/Nova Jersey, EUA',
    matchDate: dt('2026-06-25T16:00:00'), odds: { home: 4.0, draw: 3.4, away: 1.85 },
  },
  {
    homeTeam: 'Curaçao', awayTeam: 'Costa do Marfim', stage: 'Fase de Grupos', group: 'Grupo E',
    stadium: 'Lincoln Financial Field', city: 'Filadélfia, EUA',
    matchDate: dt('2026-06-25T16:00:00'), odds: { home: 5.5, draw: 3.8, away: 1.6 },
  },
  {
    homeTeam: 'Japão', awayTeam: 'Suécia', stage: 'Fase de Grupos', group: 'Grupo F',
    stadium: 'AT&T Stadium', city: 'Dallas, EUA',
    matchDate: dt('2026-06-25T19:00:00'), odds: { home: 2.3, draw: 3.2, away: 3.0 },
  },
  {
    homeTeam: 'Tunísia', awayTeam: 'Países Baixos', stage: 'Fase de Grupos', group: 'Grupo F',
    stadium: 'Arrowhead Stadium', city: 'Kansas City, EUA',
    matchDate: dt('2026-06-25T19:00:00'), odds: { home: 5.0, draw: 3.6, away: 1.65 },
  },
  {
    homeTeam: 'Turquia', awayTeam: 'Estados Unidos', stage: 'Fase de Grupos', group: 'Grupo D',
    stadium: 'SoFi Stadium', city: 'Los Angeles, EUA',
    matchDate: dt('2026-06-25T22:00:00'), odds: { home: 2.7, draw: 3.2, away: 2.6 },
  },
  {
    homeTeam: 'Paraguai', awayTeam: 'Austrália', stage: 'Fase de Grupos', group: 'Grupo D',
    stadium: "Levi's Stadium", city: 'San Francisco, EUA',
    matchDate: dt('2026-06-25T22:00:00'), odds: { home: 2.5, draw: 3.1, away: 2.9 },
  },

  // --- 26/06 ---
  {
    homeTeam: 'Noruega', awayTeam: 'França', stage: 'Fase de Grupos', group: 'Grupo I',
    stadium: 'Gillette Stadium', city: 'Boston, EUA',
    matchDate: dt('2026-06-26T15:00:00'), odds: { home: 3.8, draw: 3.4, away: 1.9 },
  },
  {
    homeTeam: 'Senegal', awayTeam: 'Iraque', stage: 'Fase de Grupos', group: 'Grupo I',
    stadium: 'BMO Field', city: 'Toronto, Canadá',
    matchDate: dt('2026-06-26T15:00:00'), odds: { home: 1.55, draw: 3.8, away: 6.0 },
  },
  {
    homeTeam: 'Cabo Verde', awayTeam: 'Arábia Saudita', stage: 'Fase de Grupos', group: 'Grupo H',
    stadium: 'NRG Stadium', city: 'Houston, EUA',
    matchDate: dt('2026-06-26T20:00:00'), odds: { home: 2.9, draw: 3.1, away: 2.5 },
  },
  {
    homeTeam: 'Uruguai', awayTeam: 'Espanha', stage: 'Fase de Grupos', group: 'Grupo H',
    stadium: 'Estadio Akron', city: 'Guadalajara, México',
    matchDate: dt('2026-06-26T20:00:00'), odds: { home: 3.5, draw: 3.3, away: 2.0 },
  },
  {
    homeTeam: 'Egito', awayTeam: 'Irã', stage: 'Fase de Grupos', group: 'Grupo G',
    stadium: 'Lumen Field', city: 'Seattle, EUA',
    matchDate: dt('2026-06-26T23:00:00'), odds: { home: 2.7, draw: 3.0, away: 2.6 },
  },
  {
    homeTeam: 'Nova Zelândia', awayTeam: 'Bélgica', stage: 'Fase de Grupos', group: 'Grupo G',
    stadium: 'BC Place', city: 'Vancouver, Canadá',
    matchDate: dt('2026-06-26T23:00:00'), odds: { home: 6.5, draw: 4.0, away: 1.45 },
  },

  // --- 27/06 ---
  {
    homeTeam: 'Panamá', awayTeam: 'Inglaterra', stage: 'Fase de Grupos', group: 'Grupo L',
    stadium: 'MetLife Stadium', city: 'Nova York/Nova Jersey, EUA',
    matchDate: dt('2026-06-27T17:00:00'), odds: { home: 7.0, draw: 4.2, away: 1.4 },
  },
  {
    homeTeam: 'Croácia', awayTeam: 'Gana', stage: 'Fase de Grupos', group: 'Grupo L',
    stadium: 'Lincoln Financial Field', city: 'Filadélfia, EUA',
    matchDate: dt('2026-06-27T17:00:00'), odds: { home: 1.7, draw: 3.5, away: 4.8 },
  },
  {
    homeTeam: 'Colômbia', awayTeam: 'Portugal', stage: 'Fase de Grupos', group: 'Grupo K',
    stadium: 'Hard Rock Stadium', city: 'Miami, EUA',
    matchDate: dt('2026-06-27T19:30:00'), odds: { home: 3.0, draw: 3.2, away: 2.3 },
  },
  {
    homeTeam: 'RD Congo', awayTeam: 'Uzbequistão', stage: 'Fase de Grupos', group: 'Grupo K',
    stadium: 'Mercedes-Benz Stadium', city: 'Atlanta, EUA',
    matchDate: dt('2026-06-27T19:30:00'), odds: { home: 2.5, draw: 3.1, away: 2.9 },
  },
  {
    homeTeam: 'Argélia', awayTeam: 'Áustria', stage: 'Fase de Grupos', group: 'Grupo J',
    stadium: 'Arrowhead Stadium', city: 'Kansas City, EUA',
    matchDate: dt('2026-06-27T22:00:00'), odds: { home: 2.6, draw: 3.1, away: 2.7 },
  },
  {
    homeTeam: 'Jordânia', awayTeam: 'Argentina', stage: 'Fase de Grupos', group: 'Grupo J',
    stadium: 'AT&T Stadium', city: 'Dallas, EUA',
    matchDate: dt('2026-06-27T22:00:00'), odds: { home: 9.0, draw: 4.5, away: 1.3 },
  },

  // =========================================================================
  // RODADA DE 32 (28/06 a 03/07/2026)
  // =========================================================================
  {
    homeTeam: 'Vice Grupo A', awayTeam: 'Vice Grupo B', stage: 'Rodada de 32',
    stadium: 'SoFi Stadium', city: 'Los Angeles, EUA',
    matchDate: dt('2026-06-28T15:00:00'), odds: ko(),
  },
  {
    homeTeam: '1º Grupo C', awayTeam: 'Vice Grupo F', stage: 'Rodada de 32',
    stadium: 'NRG Stadium', city: 'Houston, EUA',
    matchDate: dt('2026-06-29T13:00:00'), odds: ko(),
  },
  {
    homeTeam: 'Alemanha', awayTeam: 'Melhor 3º (A/B/C/D/F)', stage: 'Rodada de 32',
    stadium: 'Gillette Stadium', city: 'Boston, EUA',
    matchDate: dt('2026-06-29T16:30:00'), odds: ko(1.7, 3.5, 4.5),
  },
  {
    homeTeam: '1º Grupo F', awayTeam: 'Vice Grupo C', stage: 'Rodada de 32',
    stadium: 'Estadio BBVA', city: 'Monterrey, México',
    matchDate: dt('2026-06-29T21:00:00'), odds: ko(),
  },
  {
    homeTeam: 'Vice Grupo E', awayTeam: 'Vice Grupo I', stage: 'Rodada de 32',
    stadium: 'AT&T Stadium', city: 'Dallas, EUA',
    matchDate: dt('2026-06-30T13:00:00'), odds: ko(),
  },
  {
    homeTeam: '1º Grupo I', awayTeam: 'Melhor 3º (C/D/F/G/H)', stage: 'Rodada de 32',
    stadium: 'MetLife Stadium', city: 'Nova York/Nova Jersey, EUA',
    matchDate: dt('2026-06-30T17:00:00'), odds: ko(),
  },
  {
    homeTeam: 'México', awayTeam: 'Melhor 3º (C/E/F/H/I)', stage: 'Rodada de 32',
    stadium: 'Estadio Azteca', city: 'Cidade do México, México',
    matchDate: dt('2026-06-30T21:00:00'), odds: ko(1.9, 3.3, 3.9),
  },
  {
    homeTeam: '1º Grupo L', awayTeam: 'Melhor 3º (E/H/I/J/K)', stage: 'Rodada de 32',
    stadium: 'Mercedes-Benz Stadium', city: 'Atlanta, EUA',
    matchDate: dt('2026-07-01T12:00:00'), odds: ko(),
  },
  {
    homeTeam: '1º Grupo G', awayTeam: 'Melhor 3º (A/E/H/I/J)', stage: 'Rodada de 32',
    stadium: 'Lumen Field', city: 'Seattle, EUA',
    matchDate: dt('2026-07-01T16:00:00'), odds: ko(),
  },
  {
    homeTeam: 'Estados Unidos', awayTeam: 'Melhor 3º (B/E/I)', stage: 'Rodada de 32',
    stadium: "Levi's Stadium", city: 'San Francisco, EUA',
    matchDate: dt('2026-07-01T20:00:00'), odds: ko(1.8, 3.4, 4.2),
  },
  {
    homeTeam: '1º Grupo H', awayTeam: 'Vice Grupo J', stage: 'Rodada de 32',
    stadium: 'SoFi Stadium', city: 'Los Angeles, EUA',
    matchDate: dt('2026-07-02T15:00:00'), odds: ko(),
  },
  {
    homeTeam: 'Vice Grupo K', awayTeam: 'Vice Grupo L', stage: 'Rodada de 32',
    stadium: 'BMO Field', city: 'Toronto, Canadá',
    matchDate: dt('2026-07-02T19:00:00'), odds: ko(),
  },
  {
    homeTeam: '1º Grupo B', awayTeam: 'Melhor 3º (E/F/G/I/J)', stage: 'Rodada de 32',
    stadium: 'BC Place', city: 'Vancouver, Canadá',
    matchDate: dt('2026-07-02T23:00:00'), odds: ko(),
  },
  {
    homeTeam: 'Vice Grupo D', awayTeam: 'Vice Grupo G', stage: 'Rodada de 32',
    stadium: 'AT&T Stadium', city: 'Dallas, EUA',
    matchDate: dt('2026-07-03T14:00:00'), odds: ko(),
  },
  {
    homeTeam: 'Argentina', awayTeam: 'Vice Grupo H', stage: 'Rodada de 32',
    stadium: 'Hard Rock Stadium', city: 'Miami, EUA',
    matchDate: dt('2026-07-03T18:00:00'), odds: ko(1.65, 3.5, 4.6),
  },
  {
    homeTeam: '1º Grupo K', awayTeam: 'Melhor 3º (D/E/I/J/L)', stage: 'Rodada de 32',
    stadium: 'Arrowhead Stadium', city: 'Kansas City, EUA',
    matchDate: dt('2026-07-03T21:30:00'), odds: ko(),
  },

  // =========================================================================
  // OITAVAS DE FINAL (04 a 07/07/2026)
  // =========================================================================
  {
    homeTeam: 'Vencedor Jogo 73', awayTeam: 'Vencedor Jogo 75', stage: 'Oitavas de Final',
    stadium: 'NRG Stadium', city: 'Houston, EUA',
    matchDate: dt('2026-07-04T13:00:00'), odds: ko(),
  },
  {
    homeTeam: 'Vencedor Jogo 74', awayTeam: 'Vencedor Jogo 77', stage: 'Oitavas de Final',
    stadium: 'Lincoln Financial Field', city: 'Filadélfia, EUA',
    matchDate: dt('2026-07-04T17:00:00'), odds: ko(),
  },
  {
    homeTeam: 'Vencedor Jogo 76', awayTeam: 'Vencedor Jogo 78', stage: 'Oitavas de Final',
    stadium: 'MetLife Stadium', city: 'Nova York/Nova Jersey, EUA',
    matchDate: dt('2026-07-05T16:00:00'), odds: ko(),
  },
  {
    homeTeam: 'Vencedor Jogo 79', awayTeam: 'Vencedor Jogo 80', stage: 'Oitavas de Final',
    stadium: 'Estadio Azteca', city: 'Cidade do México, México',
    matchDate: dt('2026-07-05T20:00:00'), odds: ko(),
  },
  {
    homeTeam: 'Vencedor Jogo 83', awayTeam: 'Vencedor Jogo 84', stage: 'Oitavas de Final',
    stadium: 'AT&T Stadium', city: 'Dallas, EUA',
    matchDate: dt('2026-07-06T15:00:00'), odds: ko(),
  },
  {
    homeTeam: 'Vencedor Jogo 81', awayTeam: 'Vencedor Jogo 82', stage: 'Oitavas de Final',
    stadium: 'Lumen Field', city: 'Seattle, EUA',
    matchDate: dt('2026-07-06T17:00:00'), odds: ko(),
  },
  {
    homeTeam: 'Vencedor Jogo 86', awayTeam: 'Vencedor Jogo 88', stage: 'Oitavas de Final',
    stadium: 'Mercedes-Benz Stadium', city: 'Atlanta, EUA',
    matchDate: dt('2026-07-07T12:00:00'), odds: ko(),
  },
  {
    homeTeam: 'Vencedor Jogo 85', awayTeam: 'Vencedor Jogo 87', stage: 'Oitavas de Final',
    stadium: 'BC Place', city: 'Vancouver, Canadá',
    matchDate: dt('2026-07-07T16:00:00'), odds: ko(),
  },

  // =========================================================================
  // QUARTAS DE FINAL (09 a 11/07/2026)
  // =========================================================================
  {
    homeTeam: 'Vencedor Jogo 89', awayTeam: 'Vencedor Jogo 90', stage: 'Quartas de Final',
    stadium: 'Gillette Stadium', city: 'Boston, EUA',
    matchDate: dt('2026-07-09T16:00:00'), odds: ko(),
  },
  {
    homeTeam: 'Vencedor Jogo 93', awayTeam: 'Vencedor Jogo 94', stage: 'Quartas de Final',
    stadium: 'SoFi Stadium', city: 'Los Angeles, EUA',
    matchDate: dt('2026-07-10T15:00:00'), odds: ko(),
  },
  {
    homeTeam: 'Vencedor Jogo 91', awayTeam: 'Vencedor Jogo 92', stage: 'Quartas de Final',
    stadium: 'Hard Rock Stadium', city: 'Miami, EUA',
    matchDate: dt('2026-07-11T17:00:00'), odds: ko(),
  },
  {
    homeTeam: 'Vencedor Jogo 95', awayTeam: 'Vencedor Jogo 96', stage: 'Quartas de Final',
    stadium: 'Arrowhead Stadium', city: 'Kansas City, EUA',
    matchDate: dt('2026-07-11T21:00:00'), odds: ko(),
  },

  // =========================================================================
  // SEMIFINAIS (14 e 15/07/2026)
  // =========================================================================
  {
    homeTeam: 'Vencedor Jogo 97', awayTeam: 'Vencedor Jogo 98', stage: 'Semifinal',
    stadium: 'AT&T Stadium', city: 'Dallas, EUA',
    matchDate: dt('2026-07-14T15:00:00'), odds: ko(),
  },
  {
    homeTeam: 'Vencedor Jogo 99', awayTeam: 'Vencedor Jogo 100', stage: 'Semifinal',
    stadium: 'Mercedes-Benz Stadium', city: 'Atlanta, EUA',
    matchDate: dt('2026-07-15T15:00:00'), odds: ko(),
  },

  // =========================================================================
  // DISPUTA DE 3º LUGAR (18/07/2026) e FINAL (19/07/2026)
  // =========================================================================
  {
    homeTeam: 'Perdedor Jogo 101', awayTeam: 'Perdedor Jogo 102', stage: 'Disputa de 3º Lugar',
    stadium: 'Hard Rock Stadium', city: 'Miami, EUA',
    matchDate: dt('2026-07-18T17:00:00'), odds: ko(),
  },
  {
    homeTeam: 'Vencedor Jogo 101', awayTeam: 'Vencedor Jogo 102', stage: 'Final',
    stadium: 'MetLife Stadium', city: 'Nova York/Nova Jersey, EUA',
    matchDate: dt('2026-07-19T15:00:00'), odds: ko(),
  },
];

async function seed() {
  await connectDB();

  await Promise.all([User.deleteMany({}), Game.deleteMany({}), Bet.deleteMany({})]);
  console.log('🧹 Coleções limpas.');

  const admin = new User({ name: 'Administrador', email: 'admin@copa.com', role: 'admin' });
  admin.setPassword('admin123');

  const joao = new User({ name: 'João Apostador', email: 'joao@email.com', balance: 1000 });
  joao.setPassword('123456');

  const maria = new User({ name: 'Maria Silva', email: 'maria@email.com', balance: 1000 });
  maria.setPassword('123456');

  await User.insertMany([admin, joao, maria]);
  console.log('👤 Usuários criados (admin@copa.com / joao@email.com / maria@email.com).');

  const created = await Game.insertMany(games);
  console.log(`⚽ ${created.length} jogos da Copa 2026 criados (tabela oficial FIFA, a partir de 25/06/2026).`);

  // Aposta de exemplo: João aposta na Alemanha (visitante) contra o Equador
  const primeiroJogo = created[0];
  const aposta = await Bet.create({
    user: joao._id,
    game: primeiroJogo._id,
    pick: 'away',
    amount: 100,
    oddAtBet: primeiroJogo.odds.away,
  });
  await User.findByIdAndUpdate(joao._id, { $inc: { balance: -aposta.amount } });
  console.log('🎟️  Aposta de exemplo criada (João: R$100 na Alemanha vs Equador).');

  await mongoose.disconnect();
  console.log('✅ Seed concluído com sucesso!');
  process.exit(0);
}

seed().catch((err) => {
  console.error('❌ Erro no seed:', err);
  process.exit(1);
});

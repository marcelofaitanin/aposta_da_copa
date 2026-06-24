require('dotenv').config();
const { connectDB } = require('./src/config/db');
const createApp = require('./src/app');

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await connectDB();
    const app = createApp();
    app.listen(PORT, () => {
      console.log(`🚀 API rodando em http://localhost:${PORT}`);
      console.log(`   Healthcheck: http://localhost:${PORT}/api/health`);
    });
  } catch (err) {
    console.error('❌ Falha ao iniciar o servidor:', err.message);
    process.exit(1);
  }
}

start();

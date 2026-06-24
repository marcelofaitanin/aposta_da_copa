const mongoose = require('mongoose');

/**
 * Conecta ao MongoDB.
 *
 * Dois modos:
 *  - USE_MEMORY_DB=true  -> sobe um MongoDB em memória (mongodb-memory-server),
 *                           sem precisar instalar nada. Os dados são temporários.
 *  - caso contrário      -> conecta na MONGODB_URI (MongoDB local ou Atlas).
 *
 * Retorna a URI efetivamente usada (útil para logar e para o seed).
 */
async function connectDB() {
  mongoose.set('strictQuery', true);

  const useMemory = String(process.env.USE_MEMORY_DB).toLowerCase() === 'true';

  let uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/copaApostas';

  if (useMemory) {
    // Importado dinamicamente para não exigir o pacote quando não for usado.
    const { MongoMemoryServer } = require('mongodb-memory-server');
    const mem = await MongoMemoryServer.create();
    uri = mem.getUri('copaApostas');
    console.log('🧪 MongoDB EM MEMÓRIA iniciado (dados temporários).');
  }

  await mongoose.connect(uri);
  console.log(`✅ MongoDB conectado: ${uri.replace(/\/\/.*@/, '//<credenciais>@')}`);
  return uri;
}

module.exports = { connectDB, mongoose };

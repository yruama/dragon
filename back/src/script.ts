import dotenv from 'dotenv';
import fastify from 'fastify';
dotenv.config();

const port = "3000";
const app = fastify({
  logger: true
})

import start  from './scripts/getDataFromPokeapi';

async function main() {
  // Run the server!
  try {
    await app.listen({ port: 3000 })
    start();
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

main();
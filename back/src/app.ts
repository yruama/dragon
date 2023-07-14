import dotenv from 'dotenv';
import fastify from 'fastify';
import blippPlugin from "fastify-blipp";
dotenv.config();

import start from './scripts/getDataFromPokeapi'

const port = "3000";
const app = fastify({
  logger: true
})

app.register(blippPlugin)
app.register(import('./routes/index'))


async function main() {
  // Run the server!
  try {
    await app.listen({ port: 3000 })
    app.blipp();
    start();
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

main();
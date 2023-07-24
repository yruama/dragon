import dotenv from 'dotenv';
import fastify from 'fastify';

import start from './scripts/getDataFromPokeapi';
dotenv.config();

const port = "3000";
const app = fastify({
	logger: true
});

async function main() {
	// Run the server!
	try {
		await app.listen({ port: 3000 });
		start();
	} catch (err) {
		app.log.error(err);
		process.exit(1);
	}
}

main();

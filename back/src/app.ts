import dotenv from "dotenv";
import fastify from "fastify";
import blippPlugin from "fastify-blipp";
import cors from "@fastify/cors";
import path from "path";
import * as Knex from "knex";
import jwt from "@fastify/jwt";
import fastifyStatic from "@fastify/static";
dotenv.config();

export const knex = Knex.knex({
	client: "mysql",
	connection: {
		host: process.env.DATABASE_HOST,
		port: 3306,
		user: process.env.DATABASE_USER,
		password: process.env.DATABASE_PASSWORD,
		database: process.env.DATABASE_NAME
	}
});

export const app = fastify({
	logger: true
});

app.register(jwt, {
	secret: "supersecret"
});

app.decorate("authenticate", async function(request: any, reply: any) {
	try {
		await request.jwtVerify();
	} catch (err) {
		reply.send(err);
	}
});

app.register(fastifyStatic, {
	root: path.join(__dirname, "assets"),
	prefix: "/assets/" // optional: default '/'
});

app.register(blippPlugin);
app.register(import("./routes/pokemon.routes"), { prefix: "api/v1/pokemon" });
app.register(import("./routes/user.routes"), { prefix: "api/v1/user" });
app.register(import("./routes/pokelist.routes"), { prefix: "api/v1/pokelist" });
app.register(import("./routes/generation.routes"), { prefix: "api/v1/generation" });
app.register(cors, {
	// put your options here
});

(async function main(): Promise<void> {
	// Run the server!
	try {
		await app.listen({ port: 3000 });
		// app.blipp();
	} catch (err) {
		app.log.error(err);
		process.exit(1);
	}
})();

import * as Knex from "knex";

import fastify, { FastifyInstance, FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify";

import blippPlugin from "fastify-blipp";
import { consoleErrorWithline } from "@core/utils.core";
import cors from "@fastify/cors";
// Import des routes en statique
import dareRoutes from "./routes/dare.routes";
import dotenv from "dotenv";
import fastifyStatic from "@fastify/static";
import jwt from "@fastify/jwt";
import path from "path";
import { setGlobals } from "./config/global";
import userRoutes from "./routes/user.routes";

dotenv.config();

// Déclaration de l'extension TypeScript pour la méthode authenticate
declare module "fastify" {
	export interface FastifyInstance {
		authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
	}
}

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

const secret = process.env.JWT_SECRET;

app.register(jwt, {
	secret: secret!
});

app.decorate("authenticate", async function (request: FastifyRequest, reply: FastifyReply) {
	try {
		await request.jwtVerify();
	} catch (err) {
		reply.send(err);
	}
});

app.register(fastifyStatic, {
	root: path.join(__dirname, "assets"),
	prefix: "/assets/"
});

app.register(blippPlugin);
app.register(dareRoutes as FastifyPluginAsync, { prefix: "api/v1/dare" });
app.register(userRoutes as FastifyPluginAsync, { prefix: "api/v1/user" });
app.register(cors, {
	// put your options here
});

app.addHook('onRequest', (req, reply, done) => {
  console.log('REQ:', req.method, req.url);
  done();
});

(async function main(): Promise<void> {
	// Run the server!
	try {
		setGlobals();
		consoleErrorWithline();
		await app.listen({ port: 3000 });
		//start();
		app.blipp();
	} catch (err) {
		console.error("Error on main : ", err);
		app.log.error(err);
		process.exit(1);
	}
})();
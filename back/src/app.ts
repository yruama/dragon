import * as Knex from "knex";

import fastify, { FastifyInstance, FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify";

import blippPlugin from "fastify-blipp";
import categoryRoutes from "./routes/category.routes";
import { consoleErrorWithline } from "@core/utils.core";
import cors from "@fastify/cors";
// Import des routes en statique
import dareRoutes from "./routes/dare.routes";
import dotenv from "dotenv";
import fastifyStatic from "@fastify/static";
import jwt from "@fastify/jwt";
import levelRoutes from "./routes/level.routes";
import path from "path";
import { setGlobals } from "./config/global";
import truthRoutes from "./routes/truth.routes";
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

app.register(cors, {
	origin: [
      'https://spark.yruama.fr',
      'http://localhost:4200'
    ],
	methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
	credentials: true
});

app.register(blippPlugin);
app.register(dareRoutes as FastifyPluginAsync, { prefix: "api/v1/dare" });
app.register(truthRoutes as FastifyPluginAsync, { prefix: "api/v1/truth" });
app.register(userRoutes as FastifyPluginAsync, { prefix: "api/v1/user" });
app.register(categoryRoutes as FastifyPluginAsync, { prefix: "api/v1/category" });
app.register(levelRoutes as FastifyPluginAsync, { prefix: "api/v1/level" });


app.addHook('onRequest', (req, reply, done) => {
  console.log('REQ:', req.method, req.url);
  done();
});

(async function main(): Promise<void> {
	// Run the server!
	try {
		setGlobals();
		consoleErrorWithline();
		await app.listen({ port: 3009 });
		//start();
		app.blipp();
	} catch (err) {
		console.error("Error on main : ", err);
		app.log.error(err);
		process.exit(1);
	}
})();
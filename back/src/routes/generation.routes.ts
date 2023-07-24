import Core_Utils from "../core/utils.core";
import Core_Generation from "../core/generation.core";

const coreGeneration = new Core_Generation();
const coreUtils = new Core_Utils();

async function routes(fastify: any, options: any): Promise<void> {
	fastify.get("/", async(request: any, reply: any) => {
		try {
			const generationsData = await coreGeneration.getGenerations();
			reply.send(coreUtils.successFormat(generationsData));
		} catch (error: any) {
			reply.send(coreUtils.errorFormat(error));
		}
	});
}

export default routes;

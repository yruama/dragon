import { User } from "@type/user";
import { knex } from "../app";

export default class Core_User {
	constructor() {}

	async getUser(email: string): Promise<User> {
		try {
			const user = await knex
				.select("*")
				.from("USER")
				.where("EMAIL", email)
				.catch(err => {
					console.error(err);
				});

			if (user != null && user.length > 0) {
				return user[0];
			} else throw "No user found with this email : " + email;
		} catch (error) {
			console.error("Error => ", error);
			throw error;
		}
	}

	async addUser(user: User): Promise<number[]> {
		try {
			const userCreated = await knex("USER").insert({
				FIRSTNAME: user.FIRSTNAME,
				LASTNAME: user.LASTNAME,
				EMAIL: user.EMAIL,
				USERNAME: user.USERNAME,
				PASSWORD: user.PASSWORD,
				UUID: Math.floor(Math.random() * 9000 + 1000).toString()
			});

			return userCreated;
		} catch (error) {
			console.error("Error => ", error);
			throw error;
		}
	}

	async userExisting(email: string): Promise<boolean> {
		try {
			const user = await knex.select("*").from("USER").where("EMAIL", email);

			if (user.length > 0) return true;
			else return false;
		} catch (error) {
			console.error("Error => ", error);
			throw error;
		}
	}
}

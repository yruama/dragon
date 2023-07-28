import { User } from "@type/user";
import Core_User from "../core/user.core";
import _bcrypt from "bcrypt";
import { app } from "../app";
import Core_Generation from "../core/generation.core";
import Error_user from "@errors/user.json";

export default class Class_User {
	private readonly _user: Core_User;
	private readonly _generation: Core_Generation;

	constructor() {
		console.log("Core_Pokemon constructor");
		this._user = new Core_User();
		this._generation = new Core_Generation();
	}

	async signIn(user: User): Promise<User> {
		try {
			const userData = await this._user.getUser(user.EMAIL);

			if (userData) {
				if (_bcrypt.compareSync(user.PASSWORD, userData.PASSWORD)) {
					const token = app.jwt.sign({ email: userData.EMAIL, id: userData.ID });
					userData.token = token;
					userData.PASSWORD = "";

					return userData;
				} else {
					throw new InternalError(Error_user.MISC.NOT_AUTHENTIFIED);
				}
			} else {
				throw new InternalError(Error_user.READ.NOT_FOUND.single);
			}
		} catch (error) {
			console.error("[CORE_USER.signIn] : ", error);
			throw error;
		}
	}

	async signUp(user: User): Promise<User> {
		try {
			const userData = await this._user.userExisting(user.EMAIL);

			if (!userData) {
				const salt = _bcrypt.genSaltSync(10);
				const cryptedPassword = _bcrypt.hashSync(user.PASSWORD, salt);

				user.PASSWORD = cryptedPassword;

				await this._user.addUser(user);
				await this._generation.getGeneration(0);

				return user;
			} else {
				throw new InternalError(Error_user.CREATE.EMAIL_ALREADY_EXIST);
			}
		} catch (error) {
			console.error("[CORE_USER.signUp] : ", error);
			throw error;
		}
	}
}

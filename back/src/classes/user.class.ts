import { User } from "@type/user";
import CoreUser from "../core/user.core";
import _bcrypt from "bcrypt";
import { app } from "../app";
import CoreGeneration from "../core/generation.core";
import Error_user from "@errors/user.json";

export default class ClassUser {
	private readonly coreUser: CoreUser;
	private readonly coreGeneration: CoreGeneration;

	constructor() {
		this.coreUser = new CoreUser();
		this.coreGeneration = new CoreGeneration();
	}

	/**
	 * Sign in a user
	 * @param {User} user
	 * @returns {*}  {Promise<User>}
	 * @memberof ClassUser
	 */
	async signIn(user: User): Promise<User> {
		try {
			const userData = await this.coreUser.getByEmail(user.EMAIL);

			if (userData) {
				if (_bcrypt.compareSync(user.PASSWORD, userData.PASSWORD)) {
					// temp, à fix
					const token = app.jwt.sign({ email: userData.EMAIL, id: userData.ID } as any);
					userData.token = token;
					delete (userData as Partial<User>).PASSWORD;

					return userData;
				} else {
					throw new InternalError(Error_user.MISC.NOT_AUTHENTIFIED);
				}
			} else {
				throw new InternalError(Error_user.READ.NOT_FOUND.single);
			}
		} catch (error) {
			console.error("[CLASS_USER.signIn] : ", error);
			throw error;
		}
	}

	/**
	 * Sign up a user
	 * @param {User} user
	 * @returns {*}  {Promise<User>}
	 * @memberof ClassUser
	 */
	async signUp(user: User): Promise<User> {
		try {
			// check if user already exist, no need to throw, the error is handled in the core
			await this.coreUser.isExisting(user.EMAIL);

			const salt = _bcrypt.genSaltSync(10);
			const cryptedPassword = _bcrypt.hashSync(user.PASSWORD, salt);

			user.PASSWORD = cryptedPassword;

			await this.coreUser.add(user);
			await this.coreGeneration.get(0);

			return user;
		} catch (error) {
			console.error("[CLASS_USER.signUp] : ", error);
			throw error;
		}
	}
}

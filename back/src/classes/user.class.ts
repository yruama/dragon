import { User } from "../types/user";
import Core_User from "../core/user.core";
import _bcrypt from 'bcrypt';
import { app } from "../app";
import Core_Generation from "../core/generation.core";

export default class Class_User {

    private _user: Core_User;
    private _generation: Core_Generation;

    constructor() {
        console.log("Core_Pokemon constructor");
        this._user = new Core_User();
        this._generation = new Core_Generation();
    }

    async signIn(user: User) {
        try {
            const userData = await this._user.getUser(user.EMAIL);

            if (userData) {
                if (_bcrypt.compareSync(user.PASSWORD, userData.PASSWORD)) {
                    const token = app.jwt.sign({ email: userData.EMAIL, id: userData.ID })
                    userData.token = token;
                    userData.PASSWORD = '';

                    return userData;
                } else {
                    throw 'Invalid credentials.'
                }
            } else {
                throw 'Invalid credentials.'
            }
        } catch (error) {
            throw error
        }

    }

    async signUp(user: User) {

        try {
            const userData = await this._user.userExisting(user.EMAIL);

            if (!userData) {
                const salt = _bcrypt.genSaltSync(10);
                const cryptedPassword = _bcrypt.hashSync(user.PASSWORD, salt);

                user.PASSWORD = cryptedPassword;

                const userCreated = await this._user.addUser(user);
                const generationData = await this._generation.getGeneration(0);

                await this._user.addUserPokedex(userCreated.ID!, generationData);

                return user;
            } else {
                throw "Email already exist"
            }
        } catch (error) {
            console.log("errir => ", error)
            throw error
        }

    }
}
import { User } from "../types/user";
import Core_User from "../core/user.core";
import _bcrypt from 'bcrypt';
import { app } from "../app";

export default class Class_User {

    private _user: Core_User

    constructor() {
        console.log("Core_Pokemon constructor");
        this._user = new Core_User();
    }

    async signIn(user: User) {
        try {
            const userData = await this._user.getUser(user.EMAIL);

            if (userData) {
                if (_bcrypt.compareSync(user.PASSWORD, userData.PASSWORD)) {
                    console.log({ email: user.EMAIL, id: userData.ID })
                    const token = app.jwt.sign({ email: userData.EMAIL, id: userData.ID })
                    userData.token = token;
                    userData.PASSWORD = '';

                    console.log("userData : ", userData)

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

                this._user.addUser(user);

                return true;
            } else {
                throw "Email already exist"
            }
        } catch (error) {
            throw error
        }

    }

    async signOff(user: User) {

        try {
            const userData = await this._user.getUser(user.EMAIL);

            if (!userData) {
                const salt = _bcrypt.genSaltSync(10);
                const cryptedPassword = _bcrypt.hashSync(user.PASSWORD, salt);

                user.PASSWORD = cryptedPassword;

                this._user.addUser(user);

                return true;
            } else {
                throw "Email already exist"
            }
        } catch (error) {
            throw error
        }

    }
}
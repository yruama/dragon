
import { Generation } from "../types/generation";
import { Pokemon_Owned } from "../types/pokelist";
import { User } from "../types/user";
import Core_Utils from "./utils.core";
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

export default class Core_User {

    private _utils: Core_Utils

    constructor() {
        console.log("Core_Pokemon constructor");
        this._utils = new Core_Utils();
    }

    async getUser(email: string) {
        try {
            const user = await prisma.USER.findMany({
                where: { EMAIL: email },
            })

            if (user && user.length > 0) return user[0];
            else throw "No user found with this email : " + email;

        } catch (error) {
            throw error;
        }

    }

    async addUser(user: User) {
        try {
            const userCreated = await prisma.USER.create({
                data: {
                    FIRSTNAME:  user.FIRSTNAME,
                    LASTNAME:   user.LASTNAME,
                    EMAIL:      user.EMAIL,
                    USERNAME:   user.USERNAME,
                    PASSWORD:   user.PASSWORD,
                    UUID:       Math.floor(Math.random() * 9000 + 1000).toString(),
                },
            }).catch((err: any) => {
                console.log("Error => ", err)
            });

            return userCreated;

        } catch (error) {
            throw error;
        }

    }

    async userExisting(email: string) {
        try {
            const user = await prisma.USER.findMany({
                where: { EMAIL: email },
            }).catch((err: any) => { console.log("Error => ", err)})

            if (user && user.length > 0) return true;
            else return false;

        } catch (error) {
            throw error;
        }
    }

    async addUserPokedex(userId: number, generation: Generation) {
        try {

            const data: Pokemon_Owned[] = [];

            for (let i = generation.MIN; i < generation.MAX + 1; i++) {
                data.push({
                    POKEMON_ID: i,
                    USER_ID: userId,
                    OWNED: 0,
                    NOTE: ''
                })
            }

            await prisma.POKEMON_OWNED.createMany({
                data: data,
            }).catch((err: any) => {
                console.log("Error => ", err)
            });

            return true;

        } catch (error) {
            throw error;
        }
    }
}
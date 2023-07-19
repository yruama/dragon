import { Type } from "../types/type";
import Core_Utils from "./utils.core";
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

export default class Core_Type {

    private _utils: Core_Utils

    constructor() {
        this._utils = new Core_Utils();
    }

    async addType(type: Type) {
        try {
            const userCreated = await prisma.TYPE.create({
                data: {
                    NAME: type.NAME
                },
            }).catch((err: any) => {
                console.error("Error => ", err)
                throw err;
            });

            return userCreated;

        } catch (error) {
            console.error("Error => ", error)
            throw error;
        }
    }

    async getType(id: number) {
        try {
            const type = await prisma.TYPE.findMany({
                where: { ID: id },
            }).catch((err: any) => {
                console.error("Error => ", err)
                throw err;
            });

            if (type && type.length > 0) return type[0];
            else throw "No type found with this id : " + id;
        } catch (error) {
            console.error("Error => ", error)
            throw error;
        }

    }

    async getTypeByEnglishName(name: string) {
        try {
            const type = await prisma.TYPE.findMany({
                where: { NAME: { search: name } },
            }).catch((err: any) => {
                console.error("Error => ", err)
                throw err;
            });

            if (type && type.length > 0) return type[0];
            else throw "No type found with this name : " + name;
        } catch (error) {
            console.error("Error => ", error)
            throw error;
        }
    }

    async getTypes() {
        try {
            const type = await prisma.type.findMany({
                orderBy: {
                    ID: 'asc'
                }
            }).catch((err: any) => {
                console.error("Error => ", err)
                throw err;
            });

            if (type && type.length > 0) return type;
            else throw "No type found";
        } catch (error) {
            console.error("Error => ", error)
            throw error;
        }

    }
}
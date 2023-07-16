import { Generation } from "../types/generation";
import Core_Utils from "./utils.core";
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

export default class Core_Generation {

    private _utils: Core_Utils

    constructor() {
        console.log("Core_Generation constructor");
        this._utils = new Core_Utils();
    }

    async getGeneration(id: number) {
        try {
            const generation = await prisma.generation.findMany({
                where: { ID: id },
            })

            if (generation && generation.length > 0) return generation[0];
            else throw "No generation found with this id : " + id;
        } catch (error) {
            throw error;
        }

    }

    async getGenerations() {
        try {
            const generation = await prisma.generation.findMany({
                orderBy: {
                    ID: 'asc'
                }
            })

            if (generation && generation.length > 0) return generation;
            else throw "No generation found";
        } catch (error) {
            throw error;
        }

    }
}
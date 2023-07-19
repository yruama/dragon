import { Category } from "../types/category";
import Core_Utils from "./utils.core";
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

export default class Core_Category {

    private _utils: Core_Utils

    constructor() {
        this._utils = new Core_Utils();
    }

    async addCategory(category: Category) {
        try {
            const categoryCreated = await prisma.CATEGORY.create({
                data: {
                    NAME_FR: category.NAME_FR,
                    NAME_EN: category.NAME_EN
                },
            }).catch((err: any) => {
                console.error("Error => ", err)
                throw err;
            });

            return categoryCreated;

        } catch (error) {
            console.error("Error => ", error)
            throw error;
        }
    }

    async getCategoryByEnglishName(name: string) {
        try {
            const category = await prisma.CATEGORY.findMany({
                where: { NAME_EN: name },
            }).catch((err: any) => {
                console.error("Error => ", err)
                throw err;
            });

            if (category && category.length > 0) return category[0];
            else throw "No category found with this name : " + name;
        } catch (error) {
            console.error("Error => ", error)
            throw error;
        }
    }

    async getCategory(id: number) {
        try {
            const category = await prisma.CATEGORY.findMany({
                where: { ID: id },
            }).catch((err: any) => {
                console.error("Error => ", err)
                throw err;
            });

            if (category && category.length > 0) return category[0];
            else throw "No category found with this id : " + id;
        } catch (error) {
            console.error("Error => ", error)
            throw error;
        }

    }

    async getCategorys() {
        try {
            const category = await prisma.category.findMany({
                orderBy: {
                    ID: 'asc'
                }
            }).catch((err: any) => {
                console.error("Error => ", err)
                throw err;
            });

            if (category && category.length > 0) return category;
            else throw "No category found";
        } catch (error) {
            console.error("Error => ", error)
            throw error;
        }

    }
}
import { Shape } from "../types/shape";
import Core_Utils from "./utils.core";
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

export default class Core_Shape {

    private _utils: Core_Utils

    constructor() {
        this._utils = new Core_Utils();
    }

    async addShape(shape: Shape) {
        try {
            const userCreated = await prisma.SHAPE.create({
                data: {
                    NAME: shape.NAME
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

    async getShape(id: number) {
        try {
            const shape = await prisma.SHAPE.findMany({
                where: { ID: id },
            }).catch((err: any) => {
                console.error("Error => ", err)
                throw err;
            });

            if (shape && shape.length > 0) return shape[0];
            else throw "No shape found with this id : " + id;
        } catch (error) {
            console.error("Error => ", error)
            throw error;
        }

    }

    async getShapeByEnglishName(name: string) {
        try {
            const shape = await prisma.SHAPE.findMany({
                where: { NAME: { search: name } },
            }).catch((err: any) => {
                console.error("Error => ", err)
                throw err;
            });

            if (shape && shape.length > 0) return shape[0];
            else throw "No shape found with this name : " + name;
        } catch (error) {
            console.error("Error => ", error)
            throw error;
        }

    }

    async getShapes() {
        try {
            const shape = await prisma.shape.findMany({
                orderBy: {
                    ID: 'asc'
                }
            }).catch((err: any) => {
                console.error("Error => ", err)
                throw err;
            });

            if (shape && shape.length > 0) return shape;
            else throw "No shape found";
        } catch (error) {
            console.error("Error => ", error)
            throw error;
        }

    }
}
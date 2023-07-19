import { Talent } from "../types/talent";
import Core_Utils from "./utils.core";
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

export default class Core_Talent {

    private _utils: Core_Utils

    constructor() {
        this._utils = new Core_Utils();
    }

    async addTalent(talent: Talent) {
        try {
            const talentCreated = await prisma.TALENT.create({
                data: {
                    NAME_FR: talent.NAME_FR,
                    NAME_EN: talent.NAME_EN,
                    DESCRIPTION_FR: talent.DESCRIPTION_FR,
                    DESCRIPTION_EN: talent.DESCRIPTION_EN
                },
            }).catch((err: any) => {
                console.error("Error => ", err)
                throw err;
            });

            return talentCreated;

        } catch (error) {
            console.error("Error => ", error)
            throw error;
        }
    }

    async getTalentByEnglishName(name: string) {
        try {
            const talent = await prisma.TALENT.findMany({
                where: { NAME_EN: name },
            }).catch((err: any) => {
                console.error("Error => ", err)
                throw err;
            });

            if (talent && talent.length > 0) return talent[0];
            else throw "No talent found with this name : " + name;
        } catch (error) {
            console.error("Error => ", error)
            throw error;
        }
    }

    async getTalent(id: number) {
        try {
            const talent = await prisma.TALENT.findMany({
                where: { ID: id },
            }).catch((err: any) => {
                console.error("Error => ", err)
                throw err;
            });

            if (talent && talent.length > 0) return talent[0];
            else throw "No talent found with this id : " + id;
        } catch (error) {
            console.error("Error => ", error)
            throw error;
        }

    }

    async getTalents() {
        try {
            const talent = await prisma.talent.findMany({
                orderBy: {
                    ID: 'asc'
                }
            }).catch((err: any) => {
                console.error("Error => ", err)
                throw err;
            });

            if (talent && talent.length > 0) return talent;
            else throw "No talent found";
        } catch (error) {
            console.error("Error => ", error)
            throw error;
        }

    }
}
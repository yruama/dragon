import { Evolution } from "../types/evolution";
import Core_Utils from "./utils.core";
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

export default class Core_Evolution {

    private _utils: Core_Utils

    constructor() {
        this._utils = new Core_Utils();
    }

    async addEvolution(evolution: Evolution) {
        try {
            const evolutionCreated = await prisma.EVOLUTION.create({
                data: {
                    GENDER                  : evolution.GENDER,
                    HELD_ITEM               : evolution.HELD_ITEM,
                    ITEM                    : evolution.ITEM,
                    KNOW_MOVE               : evolution.KNOW_MOVE,
                    KNOW_MOVE_TYPE          : evolution.KNOW_MOVE_TYPE,
                    LOCATION                : evolution.LOCATION,
                    MIN_AFFECTION           : evolution.MIN_AFFECTION,
                    MIN_BEAUTY              : evolution.MIN_BEAUTY,
                    MIN_HAPPINESS           : evolution.MIN_HAPPINESS,
                    MIN_LEVEL               : evolution.MIN_LEVEL,
                    NEEDS_OVERWORLDS_RAIN    : evolution.NEEDS_OVERWORLDS_RAIN,
                    PARTY_SPECIES           : evolution.PARTY_SPECIES,
                    PARTY_TYPE              : evolution.PARTY_TYPE,
                    RELATIVE_PHYSICAL_STATS : evolution.RELATIVE_PHYSICAL_STATS,
                    TIME_OF_DAY             : evolution.TIME_OF_DAY,
                    TRADE_SPECIES           : evolution.TRADE_SPECIES,
                    TRIGGER                 : evolution.TRIGGER,
                    POKEMON_ID              : evolution.POKEMON_ID,
                    CHAIN_ID                : evolution.CHAIN_ID,
                    LEVEL                   : evolution.LEVEL
                },
            }).catch((err: any) => {
                console.error("Error => ", err)
                throw err;
            });

            return evolutionCreated;

        } catch (error) {
            console.error("Error => ", error)
            throw error;
        }
    }

    async getEvolution(id: number) {
        try {
            const evolution = await prisma.EVOLUTION.findMany({
                where: { ID: id },
            }).catch((err: any) => {
                console.error("Error => ", err)
                throw err;
            });

            if (evolution && evolution.length > 0) return evolution[0];
            else throw "No evolution found with this id : " + id;
        } catch (error) {
            console.error("Error => ", error)
            throw error;
        }

    }

    async getEvolutionByChainID(chainId: number) {
        try {
            const evolution = await prisma.EVOLUTION.findMany({
                where: { CHAIN_ID: chainId },
            }).catch((err: any) => {
                console.error("Error => ", err)
                throw err;
            });

            if (evolution && evolution.length > 0) return evolution;
            else return []
        } catch (error) {
            console.error("Error => ", error)
            throw error;
        }

    }

    async getEvolutions() {
        try {
            const evolution = await prisma.evolution.findMany({
                orderBy: {
                    ID: 'asc'
                }
            }).catch((err: any) => {
                console.error("Error => ", err)
                throw err;
            });

            if (evolution && evolution.length > 0) return evolution;
            else throw "No evolution found";
        } catch (error) {
            console.error("Error => ", error)
            throw error;
        }

    }
}
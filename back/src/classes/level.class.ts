import CoreLevel from "@core/level.core";
import { Level } from "@type/level";
import _bcrypt from "bcrypt";

export default class LevelClass {
    private readonly coreLevel: CoreLevel;
    
    constructor() {
        this.coreLevel = new CoreLevel();
    }

    async add(level: Level): Promise<number[] | boolean> {
        try {
            await this.coreLevel.add(level);

            return true;
        } catch (error) {
            console.error("[LevelClass.add] : ", error);
            throw error;
        }
    }

    async getAll() {
        try {
            let levels: Level[] = await this.coreLevel.getAll() as Level[];
           
            return levels;
        } catch (error) {
            console.error("[LevelClass.getAll] : ", error);
            throw error;
        }
    }

    async getWithPagination(offset: number, limit: number, max: number | null, language: string): Promise<Level[]> {
        try {
            // Dans le cas ou on veut une seule génération par exemple
            if (max && offset + limit > max) limit = max - offset;

            let levels: Level[] = await this.coreLevel.getWithPagination(offset, limit) as Level[];
           
            return levels;
        } catch (error) {
            console.error("[LevelClass.getWithPagination] : ", error);
            throw error;
        }
    }

}
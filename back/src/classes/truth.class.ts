import CoreTruth from "@core/truth.core";
import { Truth } from "@type/truth";
import _bcrypt from "bcrypt";

export default class TruthClass {
    private readonly coreTruth: CoreTruth;
    
    constructor() {
        this.coreTruth = new CoreTruth();
    }

    async add(truth: Truth): Promise<number[] | boolean> {
        try {
            console.log("truth : ", truth);
            await this.coreTruth.add(truth);

            return true;
        } catch (error) {
            console.error("[CLASS_POKELIST.add] : ", error);
            throw error;
        }
    }

    async getWithPagination(offset: number, limit: number, max: number | null, language: string): Promise<Truth[]> {
        try {
            // Dans le cas ou on veut une seule génération par exemple
            if (max && offset + limit > max) limit = max - offset;

            let truths: Truth[] = await this.coreTruth.getWithPagination(offset, limit) as Truth[];
           
            return truths;
        } catch (error) {
            console.error("[TruthClass.getWithPagination] : ", error);
            throw error;
        }
    }


}

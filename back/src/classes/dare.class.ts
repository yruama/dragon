import CoreDare from "@core/dare.core";
import { Dare } from "@type/dare";
import _bcrypt from "bcrypt";

export default class DareClass {
    private readonly coreDare: CoreDare;
	
    constructor() {
        this.coreDare = new CoreDare();
	}

	async add(dare: Dare): Promise<number[] | boolean> {
		try {
			console.log("dare : ", dare);
            await this.coreDare.add(dare);

			return true;
		} catch (error) {
			console.error("[DareClass.add] : ", error);
			throw error;
		}
	}

    async getWithPagination(offset: number, limit: number, max: number | null, language: string): Promise<Dare[]> {
		try {
			// Dans le cas ou on veut une seule génération par exemple
			if (max && offset + limit > max) limit = max - offset;

            let dares: Dare[] = await this.coreDare.getWithPagination(offset, limit) as Dare[];
           
			return dares;
		} catch (error) {
			console.error("[DareClass.getWithPagination] : ", error);
			throw error;
		}
	}


}

import { Category } from "@type/category";
import CoreCategory from "@core/category.core";
import _bcrypt from "bcrypt";

export default class CategoryClass {
    private readonly coreCategory: CoreCategory;
    
    constructor() {
        this.coreCategory = new CoreCategory();
    }

    async add(category: Category): Promise<number[] | boolean> {
        try {
            await this.coreCategory.add(category);

            return true;
        } catch (error) {
            console.error("[CategoryClass.add] : ", error);
            throw error;
        }
    }

    async getAll() {
        try {
            let categorys: Category[] = await this.coreCategory.getAll() as Category[];
           
            return categorys;
        } catch (error) {
            console.error("[CategoryClass.getAll] : ", error);
            throw error;
        }
    }

    async getWithPagination(offset: number, limit: number, max: number | null, language: string): Promise<Category[]> {
        try {
            // Dans le cas ou on veut une seule génération par exemple
            if (max && offset + limit > max) limit = max - offset;

            let categorys: Category[] = await this.coreCategory.getWithPagination(offset, limit) as Category[];
           
            return categorys;
        } catch (error) {
            console.error("[CategoryClass.getWithPagination] : ", error);
            throw error;
        }
    }

}
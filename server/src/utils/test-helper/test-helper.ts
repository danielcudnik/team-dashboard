import { FindOptions } from 'sequelize';

export class SequelizeTestHelper {
    public static data: any[] = [];

    static async findAll(): Promise<any[]> {
        return Promise.resolve(this.data);
    }

    static async findById(id: string | number): Promise<any | null> {
        const result = this.data.find(
            (element: { id: any }) => element.id === id
        );

        if (result) {
            return Promise.resolve(result);
        }

        return Promise.resolve(null);
    }

    static async findOne(options: FindOptions): Promise<any | null> {
        const whereQuery = options.where;
        if (whereQuery) {
            for (let [key, queryValue] of Object.entries(whereQuery)) {
                const result = this.data.find(
                    element => element[key] === queryValue
                );
                if (result) {
                    return Promise.resolve(result);
                }
            }
        }

        return Promise.resolve(null);
    }
}

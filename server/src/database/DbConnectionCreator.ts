import { Sequelize } from 'sequelize';

interface DbConnectionOptions {
    host: string;
    port: number;
    database: string;
    user: string;
    password: string;
}

export class DbConnectionCreator {
    private static sequelizeInstance: Sequelize;
    constructor() {}
    
    public static getInstance(): Sequelize {
        if (!DbConnectionCreator.sequelizeInstance) {
            const {
                database,
                user,
                password,
                host,
                port
            } = DbConnectionCreator.getEnvDatabaseOptions();

            console.log('database');
            console.log(database);

            DbConnectionCreator.sequelizeInstance = new Sequelize(database, user, password, {
                host: host,
                port: port,
                dialect: 'mysql',
                operatorsAliases: false
            });
        }
        return DbConnectionCreator.sequelizeInstance;
    }

    static getEnvDatabaseOptions(): DbConnectionOptions {
        const {
            DB_HOST = '',
            DB_PORT = '',
            DB_USER = '',
            DB_PASSWORD = '',
            DB_NAME = ''
        } = process.env;

        return {
            host: DB_HOST,
            port: +DB_PORT,
            user: DB_USER,
            password: DB_PASSWORD,
            database: DB_NAME
        };
    }

    static async createConnection(): Promise<void> {
        const sequelizeInstance = DbConnectionCreator.getInstance();
        return await sequelizeInstance.authenticate();
    }
}

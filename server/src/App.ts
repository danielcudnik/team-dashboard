import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';  

import { DbConnectionCreator } from './database/DbConnectionCreator';
import { registerDatabase } from 'database/register-database';
import { AppRouter } from './AppRouter';
import { errorMiddleware } from 'middleware/error.middleware';

import './auth/auth.controller';
import './user/user.controller';
import { corsMiddleware } from 'middleware/cors.middleware';


export class App {
    constructor() {}

    private async setup(): Promise<Application> {
        const app = express();
        try {
            await DbConnectionCreator.createConnection();
            console.log('Connection has been established successfully.');
            return Promise.resolve(app);
        } catch (err) {
            console.error('Unable to connect to the database:', err);
            throw new Error(err);
        }
    }

    async start() {
        const app = await this.setup();
        const PORT = process.env.PORT || 8080;

        app.use(bodyParser.json());
        app.use(corsMiddleware);
        app.use(cookieParser());
        app.use(AppRouter.getInstance());
        app.use(errorMiddleware);

        registerDatabase(false);

        app.listen(+PORT, () => console.log(`Server listen on port: ${PORT}`));
    }
}

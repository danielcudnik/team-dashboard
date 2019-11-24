import express, { Application } from 'express';
import bodyParser from 'body-parser';

import { DbConnectionCreator } from './database/DbConnectionCreator';
import { defineRelations } from './database/decorators/defineRelations';

import { User } from './database/models/User';
import { Profile } from './database/models/Profile';
import { AppRouter } from './AppRouter';

import './controllers/Auth';
import { Activity } from './database/models/Activity';
import { Dashboard } from './database/models/Dashboard';
import { DashboardUser } from './database/models/DashboardUser';
import { DashColumn } from './database/models/DashColumn';
import { Item } from './database/models/Item';
import { Permission } from './database/models/Permission';

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
        app.use(AppRouter.getInstance());

        defineRelations([
            User,
            Profile,
            Activity,
            Dashboard,
            DashboardUser,
            DashColumn,
            Item,
            Permission
        ]);

        const sequelize = DbConnectionCreator.getInstance();

        await sequelize.sync({ force: true });

        app.listen(+PORT, () => console.log(`Server listen on port: ${PORT}`));
    }
}

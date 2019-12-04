import express, { Application } from 'express';
import bodyParser from 'body-parser';

import { DbConnectionCreator } from './database/DbConnectionCreator';
import { defineRelations } from '@sequelize-decorators';
import { AppRouter } from './AppRouter';

import './auth/auth.controller';
import { User } from './user/user.model';
import { Profile } from './user/profile/profile.model';
import { Activity } from './dashboard/activity/activity.model';
import { Dashboard } from './dashboard/dashboard.model';
import { DashboardUser } from './dashboard/dashboard-user/dashboard-user.model';
import { DashColumn } from './dashboard/dashboard-column/dashboard-column.model';
import { Task } from './dashboard/task/task.model';
import { Permission } from './user/permission/permission.model';

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
            Task,
            Permission
        ]);

        const sequelize = DbConnectionCreator.getInstance();

        await sequelize.sync({ force: true });

        app.listen(+PORT, () => console.log(`Server listen on port: ${PORT}`));
    }
}

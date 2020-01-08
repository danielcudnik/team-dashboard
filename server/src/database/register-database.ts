import { defineRelations } from 'utils/sequelize';

import { User } from 'user/user.model';
import { Profile } from 'user/profile/profile.model';
import { Activity } from 'dashboard/activity/activity.model';
import { Dashboard } from 'dashboard/dashboard.model';
import { DashboardUser } from 'dashboard/dashboard-user/dashboard-user.model';
import { DashColumn } from 'dashboard/dashboard-column/dashboard-column.model';
import { Task } from 'dashboard/task/task.model';
import { Permission } from 'user/permission/permission.model';
import { UserPermission } from 'user/user-permission/user-permission.model';
import { DbConnectionCreator } from './DbConnectionCreator';

export async function registerDatabase(sync: boolean = false) {
    defineRelations([
        User,
        Profile,
        Activity,
        Dashboard,
        DashboardUser,
        DashColumn,
        Task,
        Permission,
        UserPermission
    ]);

    const sequelize = DbConnectionCreator.getInstance();

    if (sync) {
        await sequelize.sync({ force: true });
    }
}
import { Model } from 'sequelize';
import bcrypt from 'bcrypt';

import { Table, Id, Column, BelongsToMany } from '@sequelize-decorators';
import { Dashboard } from '../dashboard/dashboard.model';
import { DashboardUser } from '../dashboard/dashboard-user/dashboard-user.model';

@Table()
export class User extends Model {
    @Id()
    id!: string;

    @Column()
    username!: string;

    @Column()
    password!: string;

    @Column()
    email!: string;

    @Column({ defaultValue: true })
    active!: boolean;

    @Column()
    date!: Date;

    @BelongsToMany(
        () => Dashboard,
        () => DashboardUser
    )
    dashboards!: Dashboard[];

    async comparePassword(providedPassword: string) {
        const password = this.password;
        return await bcrypt.compare(providedPassword, password);
    }
}

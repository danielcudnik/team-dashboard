import { Model } from 'sequelize';
import bcrypt from 'bcrypt';

import { Table, Id, Column, BelongsToMany } from '../decorators';
import { Dashboard } from './Dashboard';
import { DashboardUser } from './DashboardUser';

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

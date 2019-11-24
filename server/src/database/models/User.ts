import { Model } from 'sequelize';

import { Table, Id, Column, HasOne, BelongsToMany } from '../decorators';
import { Profile } from './Profile';
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

    @Column()
    active!: boolean;
    
    @Column()
    date!: Date;

    @BelongsToMany(() => Dashboard, () => DashboardUser)
    dashboards!: Dashboard[];
}

import { Model } from 'sequelize';

import { Table, Id, Column, ForeignKey, HasMany, BelongsToMany } from '@sequelize-decorators';
import { User } from '../user/user.model';
import { DashColumn } from './dashboard-column/dashboard-column.model';
import { DashboardUser } from './dashboard-user/dashboard-user.model';

@Table()
export class Dashboard extends Model {
    @Id()
    id!: string;
    
    @Column({
        allowNull: false,
        unique: true
    })
    title!: string;

    @ForeignKey(() => User)
    @Column()
    userId!: string;

    @BelongsToMany(() => User, () => DashboardUser)
    allowedUsers!: User[];

    @HasMany(() => DashColumn)
    columns!: DashColumn[];
}
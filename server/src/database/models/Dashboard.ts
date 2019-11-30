import { Model } from 'sequelize';

import { Table, Id, Column, ForeignKey, HasMany, BelongsToMany } from '../decorators';
import { User } from './User';
import { DashColumn } from './DashColumn';
import { DashboardUser } from './DashboardUser';

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
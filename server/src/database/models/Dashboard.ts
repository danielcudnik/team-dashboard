import { Model } from 'sequelize';

import { Table, Id, Column, ForeignKey, HasMany, BelongsToMany, NotNull, Unique } from '../decorators';
import { User } from './User';
import { DashColumn } from './DashColumn';
import { DashboardUser } from './DashboardUser';

@Table()
export class Dashboard extends Model {
    @Id()
    id!: string;
    
    @Column()
    @Unique()
    @NotNull()
    title!: string;

    @ForeignKey(() => User)
    @Column()
    userId!: string;

    @BelongsToMany(() => User, () => DashboardUser)
    allowedUsers!: User[];

    @HasMany(() => DashColumn)
    columns!: DashColumn[];
}
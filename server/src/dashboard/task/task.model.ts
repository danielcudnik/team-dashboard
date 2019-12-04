import { Model } from 'sequelize';

import { Table, Id, Column, ForeignKey, HasMany, BelongsTo } from '@sequelize-decorators';
import { Activity } from '../activity/activity.model';
import { User } from '../../user/user.model';

@Table()
export class Task extends Model {
    @Id()
    id!: string;

    @Column()
    title!: string;

    @Column()
    desc!: string;

    @ForeignKey(() => User)
    @Column()
    userId!: string;

    @BelongsTo(() => User)
    user!: User;

    @HasMany(() => Activity)
    activities!: Activity[];
}
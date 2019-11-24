import { Model } from 'sequelize';

import { Table, Id, Column, ForeignKey, HasMany, BelongsTo } from '../decorators';
import { Activity } from './Activity';
import { User } from './User';

@Table()
export class Item extends Model {
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
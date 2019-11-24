import { Model } from 'sequelize';

import { Table, Id, Column, ForeignKey, HasMany, BelongsTo } from '../decorators';
import { Item } from './Item';
import { Dashboard } from './Dashboard';

@Table()
export class DashColumn extends Model {
    @Id()
    id!: string;

    @Column()
    title!: string;

    @ForeignKey(() => Dashboard)
    @Column()
    dashboardId!: string;

    @BelongsTo(() => Dashboard)
    dashboard!: Dashboard;

    @HasMany(() => Item)
    items!: Item[];
}
import { Model } from 'sequelize';

import { Table, Id, Column, ForeignKey, HasMany, BelongsTo } from '@sequelize-decorators';
import { Task } from '../task/task.model';
import { Dashboard } from '../dashboard.model';

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

    @HasMany(() => Task)
    tasks!: Task[];
}
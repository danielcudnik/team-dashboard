import { Model } from 'sequelize';

import { Table, Column, ForeignKey } from '../decorators';
import { User } from './User';
import { Dashboard } from './Dashboard';

@Table()
export class DashboardUser extends Model {

    @ForeignKey(() => User)
    @Column()
    userId!: string;
    
    @ForeignKey(() => Dashboard)
    @Column()
    dashboardId!: string;
}
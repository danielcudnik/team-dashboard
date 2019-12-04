import { Model } from 'sequelize';

import { Table, Column, ForeignKey } from '@sequelize-decorators';
import { User } from '../../user/user.model';
import { Dashboard } from '../dashboard.model';

@Table()
export class DashboardUser extends Model {

    @ForeignKey(() => User)
    @Column()
    userId!: string;
    
    @ForeignKey(() => Dashboard)
    @Column()
    dashboardId!: string;
}
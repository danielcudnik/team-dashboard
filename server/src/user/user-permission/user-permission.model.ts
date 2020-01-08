import { Model } from 'sequelize';

import { Table, Column, ForeignKey } from '@sequelize-decorators';
import { User } from '../user.model';
import { Permission } from '../permission/permission.model';

@Table()
export class UserPermission extends Model {

    @ForeignKey(() => User)
    @Column()
    userId!: string;
    
    @ForeignKey(() => Permission)
    @Column()
    permissionId!: string;
}
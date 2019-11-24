import { Model } from 'sequelize';

import { Table, Id, Column } from '../decorators';

@Table()
export class Permission extends Model {
    @Id()
    id!: string;

    @Column()
    name!: string;
}
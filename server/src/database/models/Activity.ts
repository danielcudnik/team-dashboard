import { Model } from 'sequelize';
import { Table, Id, Column, ForeignKey } from '../decorators';
import { User } from './User';


@Table()
export class Activity extends Model {
    @Id()
    id!: string;

    @Column()
    desc!: string;

    @Column()
    date!: Date;

    @ForeignKey(() => User)
    @Column()
    userId!: string;
}
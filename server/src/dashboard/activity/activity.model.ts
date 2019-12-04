import { Model } from 'sequelize';
import { Table, Id, Column, ForeignKey } from '@sequelize-decorators';
import { User } from '../../user/user.model';


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
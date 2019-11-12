import { Model } from 'sequelize';
import { Table, Id, Column, ForeignKey } from '../decorators/sequelize';

@Table()
export class Profile extends Model {
    @Id()
    id!: string;

    @Column()
    name!: string;

    @Column()
    surname!: string;

    @Column()
    address!: string;

    @ForeignKey('User')
    userId!: string;
}
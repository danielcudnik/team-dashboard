import { Model } from 'sequelize';

import { Table, Id, Column, ForeignKey, BelongsTo } from '@sequelize-decorators';
import { User } from '../user.model';

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

    @ForeignKey(() => User)
    @Column()
    userId!: string;
    
    @BelongsTo(() => User)
    user!: User;
}
import { Model } from 'sequelize';
import { Table, Id, Column, OneToMany } from '../decorators/sequelize';
import { Profile } from './Profile';

@Table()
export class User extends Model {
    @Id()
    id!: string;

    @Column()
    username!: string;

    @Column()
    password!: string;

    @Column()
    email!: string;

    @Column()
    active!: boolean;
    
    @Column()
    date!: Date;
    
    @OneToMany('Profile')
    profiles!: Profile[];
}

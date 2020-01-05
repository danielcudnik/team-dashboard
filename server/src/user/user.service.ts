import { FindOptions } from 'sequelize';
import { hash } from 'bcrypt';

import { User } from './user.model';
import { HttpException } from 'exceptions/HttpException';

import { Injectable } from 'utils/dependency-injection/Injectable';

@Injectable()
export class UserService {
    async findAll(options?: FindOptions): Promise<User[]> {
        try {
            return await User.findAll(options);
        } catch (error) {
            throw new HttpException(500, 'Something went wrong!');
        }
    }

    async findOne(options?: FindOptions): Promise<User | null> {
        try {
            return await User.findOne(options);
        } catch (error) {
            throw new HttpException(500, 'Something went wrong!');
        }
    }

    async findById(id: string | number): Promise<User | null> {
        try {
            return await User.findById(id);
        } catch (error) {
            throw new HttpException(500, 'Something went wrong!');
        }
    }

    async createUser(
        username: string,
        email: string,
        password: string,
        repeatedPassword: string
    ): Promise<User> {
        if (password !== repeatedPassword) {
            throw new HttpException(409, 'Passwords not match!');
        }

        const existingUser = await this.findOne({ where: { email: email } });
        console.log('existingUser');
        console.log(existingUser);

        if (existingUser) {
            throw new HttpException(409, 'User with provided email exist!');
        }

        try {
            const hashedPassword = await hash(password, 12);

            return await User.create({
                username,
                email,
                password: hashedPassword
            });
        } catch (error) {
            console.log('ERROR');
            console.log(error);
            throw new HttpException(500, 'Something went wrong!');
        }
    }
}

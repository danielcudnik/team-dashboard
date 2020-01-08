import { FindOptions } from 'sequelize';

import { Permission } from './permission.model';
import { HttpException } from 'exceptions/HttpException';

import { Injectable } from 'utils/dependency-injection/Injectable';

@Injectable()
export class PermissionService {
    async findAll(options?: FindOptions): Promise<Permission[]> {
        try {
            return await Permission.findAll(options);
        } catch (error) {
            throw new HttpException(500, 'Something went wrong!');
        }
    }

    async findOne(options?: FindOptions): Promise<Permission | null> {
        try {
            return await Permission.findOne(options);
        } catch (error) {
            throw new HttpException(500, 'Something went wrong!');
        }
    }

    async findById(id: string | number): Promise<Permission | null> {
        try {
            return await Permission.findById(id);
        } catch (error) {
            throw new HttpException(500, 'Something went wrong!');
        }
    }

    async createPermission(name: string): Promise<Permission> {
        return await Permission.create({ name: name });
    }
}

import jwt from 'jsonwebtoken';
import { compare } from 'bcrypt';

import { User } from 'user/user.model';
import { TokenData } from './types/TokenData';
import { DataStoredInToken } from './types/DataStoredInToken';
import { UserService } from 'user/user.service';
import { Inject } from 'utils/dependency-injection/Inject';
import { WrongCredentialsException } from 'exceptions/WrongCredentialsException';
import { Injectable } from 'utils/dependency-injection/Injectable';
import { Permission } from 'user/permission/permission.model';

interface UserTokenDto {
    id: string;
    email: string;
    permissions?: string[];
}
@Injectable()
export class AuthService {
    @Inject()
    private static userService: UserService;

    private createToken({id, permissions}: UserTokenDto): TokenData {
        const expiresIn = 3600000;
        const secret = process.env.JWT_SECRET || 's_e_c_r_e_t';
        const dataStoredInToken: DataStoredInToken = {
            id: id,
            permissions: permissions
        };
        return {
            expiresIn,
            token: jwt.sign(dataStoredInToken, secret, { expiresIn })
        };
    }

    async login(email: string, password: string) {
        const user = await AuthService.userService.findOne({
            where: { email: email },
            include: [Permission]
        });

        if (user) {
            const isPasswordMatching = await compare(password, user.password);
            if (isPasswordMatching) {
                const permissions = user.permissions
                    ? user.permissions.map(({ name }) => name)
                    : [];
                const tokenData = this.createToken({
                    id: user.id,
                    email: email,
                    permissions: permissions
                });
                return tokenData;
            } else {
                throw new WrongCredentialsException();
            }
        }

        throw new WrongCredentialsException();
    }
}

import 'reflect-metadata';
import jwt from 'jsonwebtoken';

import { MetadataKeys } from './MetadataKeys';
import { Request, Response, NextFunction } from 'express';
import { DataStoredInToken } from 'auth/types/DataStoredInToken';
import { UnauthorizedException } from 'exceptions/UnauthorizedException';
import { AuthenticationTokenMissingException } from 'exceptions/AuthenticationTokenMissingException';

export function PreAuthorize(perm: string) {
    return function(target: any, key: string) {

        const middlewares =
            Reflect.getMetadata(
                MetadataKeys.middleware,
                target,
                key
            ) || [];

        const preAuthorizeMiddleware = setAuthMiddleware(perm);

        Reflect.defineMetadata(
            MetadataKeys.middleware,
            [...middlewares, preAuthorizeMiddleware],
            target,
            key
        );
    };
}
function setAuthMiddleware(perm: string) {
    return async function authMiddleware(
            request: Request,
            response: Response,
            next: NextFunction
        ) {
            const cookies = request.cookies;

            if (cookies && cookies.Authorization) {
                const secret = process.env.JWT_SECRET || 's_e_c_r_e_t';
                try {
                    const { permissions = [] } = jwt.verify(
                        cookies.Authorization,
                        secret
                    ) as DataStoredInToken;
                    const hasPermission = permissions.includes(perm);
                    if (hasPermission) {
                        next();
                    } else {
                        next(new UnauthorizedException());
                    }
                } catch (error) {
                    next(new UnauthorizedException());
                }
            } else {
                next(new AuthenticationTokenMissingException());
            }
        };
}

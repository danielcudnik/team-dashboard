import { Request, Response, NextFunction } from 'express';
import { Controller, Post, BodyValidator, Use, Get } from '@express-decorators';
import { Inject } from 'utils/dependency-injection/Inject';

import { UserService } from '../user/user.service';
import { CustomResponse } from 'utils/express/CustomResponse';
import { PreAuthorize } from 'utils/express/PreAuthorize';
import { User } from './user.model';

const FETCH_ALL_USERS_PERM = 'FETCH_ALL_USERS_PERM';

@Controller('/users')
class UserController {
    @Inject()
    private static userService: UserService;

    @Get('/')
    @PreAuthorize(FETCH_ALL_USERS_PERM)
    async fetchAllUsers(req: Request, res: Response): Promise<CustomResponse> {
        const users: User[] = await UserController.userService.findAll();

        return { status: 200, users: users };
    }
}

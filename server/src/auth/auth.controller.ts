import { Request, Response, NextFunction } from 'express';
import { hash } from 'bcrypt';

import { validationMiddleware } from '../middleware/validation.middleware';
import { Controller, Post, BodyValidator, Use, Get } from '@express-decorators';
import { Inject } from 'utils/dependency-injection/Inject';
import { CreateUserDto } from '../user/dtos/create-user.dto';
import { LoginDto } from './dtos/login.dto';

import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { CustomResponse } from 'utils/express/CustomResponse';

@Controller('/auth')
class AuthController {
    @Inject()
    private static userService: UserService;
    @Inject()
    private static authService: AuthService;

    @Post('/login')
    @Use(validationMiddleware(LoginDto))
    async login(req: Request, res: Response): Promise<CustomResponse> {
        const { email, password }: LoginDto = req.body;

        const { token, expiresIn } = await AuthController.authService.login(
            email,
            password
        );
        res.cookie('Authorization', token, {httpOnly: true, maxAge: expiresIn});
        
        return { status: 200, msg: 'Successfuly logged in!' };
    }

    @Post('/signup')
    @Use(validationMiddleware(CreateUserDto))
    async signup(req: Request): Promise<CustomResponse> {
        const {
            username,
            password,
            email,
            repeatedPassword
        }: CreateUserDto = req.body;

        const user = await AuthController.userService.createUser(
            username,
            email,
            password,
            repeatedPassword
        );
        return { status: 201, id: user.id };
    }
}

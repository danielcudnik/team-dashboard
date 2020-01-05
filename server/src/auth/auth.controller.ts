import { Request, Response, NextFunction } from 'express';
import { hash } from 'bcrypt';

import { validationMiddleware } from '../middleware/validation.middleware';
import { Controller, Post, BodyValidator, Use, Get } from '@express-decorators';
import { Inject } from 'utils/dependency-injection/Inject';
import { CreateUserDto } from '../user/dtos/create-user.dto';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';
import { CustomResponse } from 'utils/express/CustomResponse';

@Controller('/auth')
class AuthController {
    @Inject()
    private static userService: UserService;

    @Post('/login')
    @BodyValidator('email', 'password')
    login(req: Request, res: Response): void {
        const { email, password } = req.body;
    }

    @Post('/signup')
    @Use(validationMiddleware(CreateUserDto))
    async signup(req: Request): Promise<CustomResponse> {
        const { username, password, email, repeatedPassword } = req.body;

        const user = await AuthController.userService.createUser(
            username,
            email,
            password,
            repeatedPassword
        );
        return { status: 201, id: user.id };
    }
}

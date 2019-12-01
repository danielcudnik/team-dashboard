import { Request, Response } from 'express';
import { Controller, Get, Post, BodyValidator, Use } from './decorators';
import { hash } from 'bcrypt';

import { User } from '../database/models/User';
import { validationMiddleware } from '../middleware/validation.middleware';
import { CreateUserDto } from '../dtos/User/CreateUserDto';

@Controller('/auth')
class AuthController {
    @Post('/login')
    @BodyValidator('email', 'password')
    login(req: Request, res: Response): void {
        const { email, password } = req.body;
    }

    @Post('/signup')
    @Use(validationMiddleware(CreateUserDto))
    async signup(req: Request, res: Response): Promise<void> {
        const { username, password, email, repeatedPassword } = req.body;
        const hashedPassword = await hash(password, 12);

        const user = await User.create({ username, password: hashedPassword });
        res.json({ id: user.id, msg: 'account created successfully' });
    }
}

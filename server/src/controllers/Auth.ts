import { Request, Response } from 'express';
import { Controller, Get, Post, BodyValidator } from './decorators';
import {hash} from 'bcrypt';

import { User } from '../database/models/User';

@Controller('/auth')
class AuthController {
    @Post('/login')
    @BodyValidator('email', 'password')
    login(req: Request, res: Response): void {
        const { email, password } = req.body;
    }

    @Post('/signup')
    async signup(req: Request, res: Response): Promise<void> {
        const { username, password } = req.body;

        const hashedPassword = await hash(password, 12);

        const user = await User.create({ username, password: hashedPassword });
        console.log(user);
        res.json({ id: user.id, msg: 'account created successfully' });
    }
}

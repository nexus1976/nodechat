import express, { Request, Response } from 'express';
import { LoginModel } from './login.model';
import { GetOrCreateActiveSessionByUserId } from '../../domain/repositories/usersession.repository';
import { GetByLoginId } from '../../domain/repositories/user.repository';
import { User } from 'src/domain/entities/user.domain.entity';

export const loginRouter = express.Router();

// POST login/:LoginModel
loginRouter.post('/', async (req: Request, res: Response) => {
	const item: LoginModel = req.body;
	if (!item || !item.login || !item.password) {
		res.status(401).send('The credentials supplied were not correct.');
		return;
	}
	
	const user: User | null = await GetByLoginId(item.login);
	if (!user) {
		res.status(404).send('The user specified could not found.');
		return;
	}
	
	const sessionId: string = await GetOrCreateActiveSessionByUserId(user.id);
	res.status(200).send(sessionId);
});
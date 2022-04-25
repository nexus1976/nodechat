import express, { Request, Response } from 'express';
import { LoginModel } from './login.model';
import { GetOrCreateActiveSessionByUserId } from '../../domain/repositories/usersession.domain.repository';
import { GetByLoginId } from '../../domain/repositories/user.domain.repository';
import { User } from 'src/domain/entities/user.domain.entity';

export const LoginRouter = express.Router();

// POST login/:LoginModel
LoginRouter.post('/', async (req: Request, res: Response) => {
	const model: LoginModel = req.body;
	if (!model || !model.login || !model.password) {
		res.status(401).send('The credentials supplied were not correct.');
		return;
	}
	
	const user: User | null = await GetByLoginId(model.login);
	if (!user) {
		res.status(404).send('The user specified could not found.');
		return;
	}
	
	const sessionId: string | null = await GetOrCreateActiveSessionByUserId(user.id);
	if (!sessionId) {
		res.status(500).send('An unknown error occurred. A new sessionId could not be created.');
		return;
	}
	res.status(200).send(sessionId);
});
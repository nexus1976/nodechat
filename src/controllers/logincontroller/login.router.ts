import express, { Request, Response } from 'express';
import { LoginModel } from './login.model';
import { v4 as uuidv4 } from 'uuid';
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
	// todo: scaffold - check the UserSessions table in the datastore and get or create an active session id
	const newId: string = uuidv4();
	res.status(200).send(newId);
});
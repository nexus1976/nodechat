import express, { Request, Response } from 'express';
import { LoginModel } from './login.model';
import { MintJwtToken } from '../../domain/services/token.domain.service';
import { GetByLoginId } from '../../domain/repositories/user.domain.repository';
import { User } from 'src/domain/entities/user.domain.entity';

export const LoginRouter = express.Router();

// POST login/:LoginModel
LoginRouter.post('/', async (req: Request, res: Response) => {
	const model: LoginModel = req.body;
	if (!model || !model.login || !model.password) {
		res.status(400).send('The credentials supplied were not correct.');
		return;
	}
	
	const userResponse: User | null | boolean = await GetByLoginId(model.login, model.password);
	if (userResponse === null) {
		res.status(404).send('The user specified could not found.');
		return;
	}
	if (userResponse === false) {
		res.status(401).send('The credentials supplied were not valid.');
		return;		
	}
	
	const user: User = userResponse as User;
	
	const jwt: string | null = MintJwtToken(user.id, user.fullname);
	if (!jwt) {
		res.status(500).send('An unknown error occurred. A new jwt token could not be minted.');
		return;
	}
	res.status(201).send(jwt);
});
import express, { Request, Response } from 'express';
import { IsValidUUID } from '../../domain/services/uuid-utilities.domain.service';
import { UserExists, GetById, GetAll } from '../../domain/repositories/user.domain.repository';
import { UserModel } from './user.model';
import { User } from '../../domain/entities/user.domain.entity';
import { MapDomainToModel } from './user.mapping.service';

export const UserRouter = express.Router();

UserRouter.get('/:id', async (req: Request, res: Response) => {
	const userId = req.params.userId;
	const userIdValid: boolean = IsValidUUID(userId);
	
	if (!userIdValid) {
		res.status(400).send("The userId specified was not a valid id.");
		return;
	}
	const userExists = await UserExists(userId);
	if (!userExists) {
		res.status(404).send("The userId specified was not found.");
	}
	const user: User | null = await GetById(userId);
	if (!user) {
		res.status(404).send("The userId specified was not found.");
	}
	const response: UserModel | null = MapDomainToModel(user);
	res.status(200).send(response);
});

UserRouter.get('/', async (req: Request, res: Response) => {
	const users: Array<User> = await GetAll();
	res.status(200).send(users);
});
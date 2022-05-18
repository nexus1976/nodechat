import express, { Request, Response } from 'express';
import { UserExists } from '../../domain/repositories/user.domain.repository';
import { DeleteActiveSessionByUserId } from '../../domain/repositories/usersession.domain.repository';
import { IsValidUUID } from '../../domain/services/uuid-utilities.domain.service';

export const LogoutRouter = express.Router();

//POST logout/{:userId}
LogoutRouter.post('/:userId', async (req: Request, res: Response) => {
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
	await DeleteActiveSessionByUserId(userId);
	res.status(200);
});
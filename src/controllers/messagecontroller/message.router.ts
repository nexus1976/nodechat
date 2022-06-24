import express, { Request, Response } from 'express';
import { IsValidUUID } from '../../domain/services/uuid-utilities.domain.service';
import { MessageModel } from './message.model';
import { Message } from '../../domain/entities/message.domain.entity';
import { CreateMessage, GetMessages } from '../../domain/repositories/message.domain.repository';
import { MapDomainToModels } from './message.mapping.service';
import { AuthenticationMiddleware } from '../../domain/services/token.domain.service';

export const MessageRouter = express.Router();

// POST /messages/:MessageModel
MessageRouter.post('/', AuthenticationMiddleware, async (req: Request, res: Response) => {
	const model: MessageModel = req.body;
	if (model == undefined || model == null || !model.messagetext || model.messagetext.trim().length === 0 || !IsValidUUID(model.userid)) {
		res.status(400).send('The model was not valid. A proper message model with messagetext and a valid userid is expected.');
		return;
	}
	
	const message : Message = {
		id: null,
		messagedate: null,
		messagetext: model.messagetext,
		userid: model.userid ?? ''
	};
	
	const response = await CreateMessage(message);
	if (!response) {
		res.status(500).send('An unknown error occurred. A message could not be created.');
		return;
	}
	res.status(200).send(response);
});

// GET /messages
MessageRouter.get('/', AuthenticationMiddleware, async (req: Request, res: Response) => {
	const messages = await GetMessages();
	if (messages && messages.length && messages.length > 0) {
		const response: Array<MessageModel> = MapDomainToModels(messages);
		res.status(200).send(response);
	} else {
		res.status(200).send(null);
	}
});
import { CreateNewClient } from '../services/connection.domain.service';
import { Client } from 'pg';
import { UserExists } from './user.domain.repository';
import { IsValidUUID, GetNewUUID } from '../services/uuid-utilities.domain.service';
import { Message } from '../entities/message.domain.entity';

export const CreateMessage = async (message: Message): Promise<null | Message> => {
	if (!message || !message.messagetext || message.messagetext.trim().length === 0) {
		return null;
	}
	if (!IsValidUUID(message.userid)) {
		throw new Error('The userid was not a valid value.');
	}
	const userExists = await UserExists(message.userid);
	if (!userExists) {
		throw new Error('The user specified was not found.');
	}
	message.id = GetNewUUID();
	message.messagedate = new Date();
	const client: Client = CreateNewClient();
	const query: string = 'INSERT INTO "public"."Messages" ("id", "userid", "messagedate", "messagetext") VALUES($1, $2, $3, $4);';
	await client.query(query, [message.id, message.userid, message.messagedate, message.messagetext]);
	return message;
}
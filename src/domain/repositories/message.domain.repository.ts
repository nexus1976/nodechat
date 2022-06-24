import { CreateNewClient } from '../services/connection.domain.service';
import { Client, QueryResult } from 'pg';
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
	client.connect();
	await client.query(query, [message.id, message.userid, message.messagedate, message.messagetext]);
	client.end();
	return message;
}

export const GetMessages = async (): Promise<Array<Message>> => {
	const client: Client = CreateNewClient();
	const query: string = 'SELECT "m"."id", "m"."userid", "m"."messagedate", "m"."messagetext" FROM "public"."Messages" m;';
	client.connect();
	const result: QueryResult<any> = await client.query(query);
	client.end();
	const messages: Array<Message> = new Array<Message>();
	if (result && result.rows && (result.rows.length > 0)) {
		result.rows.forEach(element => {
			const message: Message = new Message(element.id as string, element.userid as string, element.messagedate as Date, element.messagetext as string);
			messages.push(message);
		});
	}
	return messages;
}
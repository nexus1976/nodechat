import { CreateNewClient } from '../services/connection.domain.service';
import { Client } from 'pg';
import { IsValidUUID, GetNewUUID } from '../services/uuid-utilities.domain.service';

export const GetOrCreateActiveSessionByUserId = async (userId: string): Promise<null | string> => {
	if (!IsValidUUID(userId)) {
		return null;
	}
	const client: Client = CreateNewClient();
	const queryGET: string = 'SELECT "us"."id" FROM "public"."UserSessions" us WHERE "us"."userid" = $1 AND "us"."isactive" = TRUE;';
	
	client.connect();
	const result = await client.query(queryGET, [userId]);
	let sessionId: string|null;
	if (!result || !result.rows || !(result.rows.length > 0)) {
		sessionId = null;
	} else {
		sessionId = result.rows[0].id as string;
		if (!IsValidUUID(sessionId)) {
			sessionId = null;
		}
	}
	
	if (sessionId !== null) {
		client.end();
		return sessionId;
	}
	
	sessionId = GetNewUUID();
	const queryPUT: string = 'INSERT INTO "public"."UserSessions" ("id", "userid", "isactive") VALUES($1, $2, TRUE);';
	await client.query(queryPUT, [sessionId, userId]);
	client.end();
	
	return sessionId;
}

export const DeleteActiveSessionByUserId = async (userId: string): Promise<void> => {
	if (!IsValidUUID(userId)) {
		return;
	}
	const client: Client = CreateNewClient();
	const query: string = 'UPDATE "public"."UserSessions" SET "isactive" = FALSE WHERE "userid" = $1;';
	
	client.connect();
	await client.query(query, [userId]);
	client.end();
	return;
}
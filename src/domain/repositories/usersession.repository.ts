import { CreateNewClient } from './connection.service';
import { Client } from 'pg';
import { v4 as uuidv4, NIL as NIL_UUID } from 'uuid';

export const GetOrCreateActiveSessionByUserId = async (userId: string): Promise<string> => {
	const client: Client = CreateNewClient();
	const queryGET: string = `SELECT "us"."id" FROM "public"."UserSessions" us WHERE "us"."userid" = '${userId}' AND "us"."isactive" = TRUE;`;
	
	client.connect();
	const result = await client.query(queryGET);
	let sessionId: string|null;
	if (!result || !result.rows || !(result.rows.length > 0)) {
		sessionId = null;
	} else {
		sessionId = result.rows[0].id as string;
		if (sessionId === null || sessionId === undefined || sessionId.trim().length === 0 || sessionId === NIL_UUID) {
			sessionId = null;
		}
	}
	
	if (sessionId !== null) {
		client.end();
		return sessionId;
	}
	
	sessionId = uuidv4();
	const queryPUT: string = `INSERT INTO "public"."UserSessions" ("id", "userid", "isactive") VALUES('${sessionId}', '${userId}', TRUE);`;
	await client.query(queryPUT);
	client.end();
	
	return sessionId;
}

export const DeleteActiveSessionByUserId = async (userId: string): Promise<void> => {
	const client: Client = CreateNewClient();
	const query: string = `UPDATE "public"."UserSessions" SET "isactive" = FALSE WHERE "userid" = '${userId}';`;
	
	client.connect();
	await client.query(query);
	client.end();
	return;
}
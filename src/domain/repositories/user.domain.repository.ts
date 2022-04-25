import { CreateNewClient } from '../services/connection.domain.service';
import { Client } from 'pg';
import { IsValidUUID } from '../services/uuid-utilities.domain.service';
import { User } from '../entities/user.domain.entity';

export const GetByLoginId = async (loginId: string): Promise<null | User> => {
	if (loginId === undefined || loginId === null || loginId.trim().length === 0) {
		return null;
	}
	const client: Client = CreateNewClient();
	const query = 'SELECT * FROM "public"."Users" u WHERE "u"."loginid" = $1';
	
	client.connect();
	const result = await client.query(query, [loginId]);
	client.end();
	if (!result || !result.rows || !(result.rows.length > 0)) {
		return null;
	}
	const row = result.rows[0];
	const user: User = {
		id: row.id,
		email: row.email,
		firstname: row.firstname,
		lastname: row.lastname,
		loginid: row.loginid,
		mobilephone: row.mobilephone,
		passwordhash: row.passwordhash,
		salt: row.salt
	};
	return user;
};

export const UserExists = async (userId: string): Promise<boolean> => {
	if (!IsValidUUID(userId)) {
		return false;
	}
	const query: string = 'SELECT EXISTS(SELECT 1 FROM "public"."Users" u WHERE "u"."id" = $1) AS "exists"';
	const client: Client = CreateNewClient();
	client.connect();
	const result = await client.query(query, [userId]);
	client.end;
	if (!result || !result.rows || !(result.rows.length > 0)) {
		return false;
	}
	const exists = result.rows[0] as boolean;
	return exists;
}
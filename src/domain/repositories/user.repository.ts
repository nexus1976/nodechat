import { CreateNewClient } from './connection.service';
import { User } from '../entities/user.domain.entity';
import { Client } from 'pg';

export const GetByLoginId = async (loginId: string): Promise<null | User> => {
	const client: Client = CreateNewClient();
	const query = `SELECT * FROM "public"."Users" u WHERE "u"."loginid" = '${loginId}'`;
	
	client.connect();
	const result = await client.query(query);
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
	const query: string = `SELECT EXISTS(SELECT 1 FROM "public"."Users" u WHERE "u"."id" = '${userId}') AS "exists"`
	const client: Client = CreateNewClient();
	client.connect();
	const result = await client.query(query);
	client.end;
	if (!result || !result.rows || !(result.rows.length > 0)) {
		return false;
	}
	const exists = result.rows[0] as boolean;
	return exists;
}
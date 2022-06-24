import { CreateNewClient } from '../services/connection.domain.service';
import { Client, QueryResult } from 'pg';
import { IsValidUUID } from '../services/uuid-utilities.domain.service';
import { User } from '../entities/user.domain.entity';

export const GetByLoginId = async (loginId: string, passwordhash: string): Promise<null | User | boolean> => {
	if (loginId === undefined || loginId === null || loginId.trim().length === 0) {
		return null;
	}
	const client: Client = CreateNewClient();
	const query = 'SELECT * FROM "public"."Users" u WHERE "u"."loginid" = $1 AND "u"."isdeactivated"=false;';
	
	client.connect();
	const result = await client.query(query, [loginId]);
	client.end();
	if (!result || !result.rows || !(result.rows.length > 0)) {
		return null;
	}
	const element = result.rows[0];

	if (element.passwordhash) {
		if (element.passwordhash !== passwordhash) {
			return false;
		}
	}
	const user: User = new User(
		element.id,
		element.firstname,
		element.lastname,
		element.email,
		element.mobilephone,
		element.loginid,
		element.passwordhash,
		element.salt
	);
	return user;
};

export const GetById = async (userId: string): Promise<null | User> => {
	if (userId === undefined || userId === null || userId.trim().length === 0) {
		return null;
	}
	const client: Client = CreateNewClient();
	const query = 'SELECT * FROM "public"."Users" u WHERE "u"."id" = $1';
	
	client.connect();
	const result = await client.query(query, [userId]);
	client.end();
	if (!result || !result.rows || !(result.rows.length > 0)) {
		return null;
	}
	const element = result.rows[0];
	const user: User = new User(
		element.id,
		element.firstname,
		element.lastname,
		element.email,
		element.mobilephone,
		element.loginid,
		element.passwordhash,
		element.salt
	);
	return user;
};

export const GetAll = async (): Promise<Array<User>> => {
	const client: Client = CreateNewClient();
	const query = 'SELECT * FROM "public"."Users"';
	client.connect();
	const result: QueryResult<any> = await client.query(query);
	client.end();
	const users: Array<User> = new Array<User>();
	if (result && result.rows && (result.rows.length > 0)) {
		result.rows.forEach(element => {
			const user: User = new User(
				element.id,
				element.firstname,
				element.lastname,
				element.email,
				element.mobilephone,
				element.loginid,
				element.passwordhash,
				element.salt
			);
			users.push(user);
		});
	}
	return users;
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
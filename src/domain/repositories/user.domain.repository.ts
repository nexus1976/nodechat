import { CreateNewClient } from '../services/connection.domain.service';
import { Client, QueryResult } from 'pg';
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
	const element = result.rows[0];
	const user: User = {
		id: element.id,
		email: element.email,
		firstname: element.firstname,
		lastname: element.lastname,
		loginid: element.loginid,
		mobilephone: element.mobilephone,
		passwordhash: element.passwordhash,
		salt: element.salt
	};
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
	const user: User = {
		id: element.id as string,
		email: element.email as string,
		firstname: element.firstname as string,
		lastname: element.lastname as string,
		loginid: element.loginid as string,
		mobilephone: element.mobilephone as string,
		passwordhash: element.passwordhash as string,
		salt: element.salt as string
	};
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
			const user: User = {
				id: element.id as string,
				email: element.email as string,
				firstname: element.firstname as string,
				lastname: element.lastname as string,
				loginid: element.loginid as string,
				mobilephone: element.mobilephone as string,
				passwordhash: element.passwordhash as string,
				salt: element.salt as string	
			};
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
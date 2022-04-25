import * as dotenv from 'dotenv';
import { Client, ClientConfig } from 'pg';
dotenv.config();
const PORT: number = parseInt(process.env.POSTGRES_PORT as string, 10);
const clientConfig: ClientConfig = {
	host: process.env.POSTGRES_SERVER as string,
	port: PORT,
	database: process.env.POSTGRES_DB as string,
	user: process.env.POSTGRES_USER as string,
	password: process.env.POSTGRES_PASSWORD as string
};

export const CreateNewClient = (): Client => {
	const client = new Client(clientConfig);
	return client;
};

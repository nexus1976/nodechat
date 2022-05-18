/**
 * Required External Modules
 */

import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { LoginRouter } from './controllers/logincontroller/login.router';
import { LogoutRouter } from './controllers/logoutcontroller/logout.router';
import { MessageRouter } from './controllers/messagecontroller/message.router';
import { UserRouter } from './controllers/usercontroller/user.router';

dotenv.config();

/**
 * App Variables
 */

if (!process.env.PORT) {
	process.exit(1);
}
const PORT: number = parseInt(process.env.PORT as string, 10);
const app = express();

/**
 *  App Configuration
 */

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use('/api/login', LoginRouter);
app.use('/api/logout', LogoutRouter);
app.use('/api/messages', MessageRouter);
app.use('/api/users', UserRouter);

/**
 * Server Activation
 */

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}\nDid you remember to ensure your PostgreSQL database has been configured and started?`);
});

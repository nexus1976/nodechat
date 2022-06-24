/** Required External Modules */

import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import fs from 'fs';
import * as swaggerUi from 'swagger-ui-express';
import { LoginRouter } from './controllers/logincontroller/login.router';
import { LogoutRouter } from './controllers/logoutcontroller/logout.router';
import { MessageRouter } from './controllers/messagecontroller/message.router';
import { UserRouter } from './controllers/usercontroller/user.router';

dotenv.config();

/** App Variables */
if (!process.env.PORT) {
	process.exit(1);
}
const PORT: number = parseInt(process.env.PORT as string, 10);
const app = express();

/** App Configuration */
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use('/login', LoginRouter);
app.use('/logout', LogoutRouter);
app.use('/messages', MessageRouter);
app.use('/users', UserRouter);

/**Swagger Setup */
const swaggerFile: any = (process.cwd() + "/src/swagger.json");
const swaggerData: any = fs.readFileSync(swaggerFile, 'utf-8');
const swaggerDocument = JSON.parse(swaggerData);
const swaggerOptions: swaggerUi.SwaggerUiOptions = {
	explorer: false
};
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerOptions));

/** Server Activation */
app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}\nDid you remember to ensure your PostgreSQL database has been configured and started?`);
});

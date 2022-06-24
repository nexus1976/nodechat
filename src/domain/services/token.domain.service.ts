import { NextFunction, Request, Response } from 'express';
import * as dotenv from 'dotenv';
import Jwt, { SignOptions, VerifyOptions } from 'jsonwebtoken';

dotenv.config();
const JWT_PRIVATE_KEY: string = process.env.JWT_PRIVATE_KEY as string;
const JWT_PUBLIC_KEY: string = process.env.JWT_PUBLIC_KEY as string;
const JWT_EXPIRY: string = process.env.JWT_EXPIRY as string;
const JWT_AUDIENCE: string = process.env.JWT_AUDIENCE as string;
const JWT_ISSUER: string = process.env.JWT_ISSUER as string;

export const MintJwtToken = (userId: string, userName: string): string | null => {
	if (!userId || !userName || !JWT_PRIVATE_KEY || !JWT_EXPIRY) {
		return null;
	}
	const jwtOptions: SignOptions = {
		expiresIn: JWT_EXPIRY,
		algorithm: 'RS512',
		issuer: JWT_ISSUER,
		audience: JWT_AUDIENCE
	};
	const accessToken: string = Jwt.sign({ username: userName, userid: userId }, JWT_PRIVATE_KEY, jwtOptions);
	return accessToken;
}

export const AuthenticationMiddleware = (req: Request, res: Response, next: NextFunction) => {
	const authHeader: string | undefined = req.headers.authorization;
	
	if (authHeader) {
		const token: string = authHeader.split(' ')[1];
		const jwtOptions: VerifyOptions = {
			algorithms: ['RS512'],
			audience: JWT_AUDIENCE,
			issuer: JWT_ISSUER
		};
		Jwt.verify(token, JWT_PUBLIC_KEY, jwtOptions, (err, decoded) => {
			if (err) {
				console.log(err.message);
				res.sendStatus(403);
				return;
			}
			if (!decoded) {
				console.log('Error: found undefined decoded jwt!');
				res.sendStatus(403);
				return;
			}
			req['token'] = decoded;
			next();
		});
	} else {
		res.sendStatus(401);
		return;
	}
}
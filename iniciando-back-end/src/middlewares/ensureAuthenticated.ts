import { Request, Response, NextFunction } from "express";
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';
import AppError from '../errors/AppError';


interface TokenPayload{
    iat: number;
    expo: number;
    sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): void {
    // Validação do token JWT.
    const authHeader = request.headers.authorization;

    if(!authHeader){
        throw new AppError ('JWT token is missing', 401);
    }

    //Bearer asdnsajdTOKENasdasd

    const [, token] = authHeader.split(' ')
    // A falta da primeira variável na desestruturação indica que ela não será utilizada.

    const { secret } = authConfig.jwt;
    try {
        const decoded = verify(token, secret)

        const { sub } = decoded as TokenPayload;

        request.user = {
            id: sub,
        }

        console.log(decoded);

        return next();
    } catch {
        throw new AppError('Invalid JWT token', 401);
    }


}

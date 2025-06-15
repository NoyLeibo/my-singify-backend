import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
import { Request, Response, NextFunction, RequestHandler } from 'express'
import { jwtService } from '../utils/jwt'

export const verifyUserToken: RequestHandler = (
  request: Request,
  response: Response,
  next: NextFunction,
): void => {
  console.log('Verify User Token')

  // const token = request.headers?.authorization
  // console.log(token)

  // if (!token) {
  //   throw new Error('Token variable is not set')
  // }

  // jwtService.verifyToken(token)
  return next()
}

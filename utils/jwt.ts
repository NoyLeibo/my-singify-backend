import jwt, { VerifyErrors } from 'jsonwebtoken'
import { IUserModel } from '../models/user.model'

const createToken = (user: IUserModel): string => {
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error('❌ JWT_SECRET is not defined in environment variables')
    }

    const payload = user.removeSensitiveData()

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1d',
    })

    return token
  } catch (error: any) {
    console.error('❌ Error creating JWT:', error.message)
    throw new Error(error.message)
  }
}

const createShortToken = (user: IUserModel): string => {
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error('❌ JWT_SECRET is not defined in environment variables')
    }
    const payload = user.removeAllData()

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1d',
    })

    return token
  } catch (error: any) {
    console.error('❌ Error creating JWT:', error.message)
    throw new Error(error.message)
  }
}

const verifyToken = (token: string) => {
  try {
    const secret = process.env.JWT_SECRET
    if (!secret) {
      throw new Error('JWT secret is not defined')
    }

    return jwt.verify(token, secret)
    return true
  } catch (error: any) {
    console.error(error.message)
    throw new Error(error.message)
  }
}

export const jwtService = {
  createToken,
  createShortToken,
  verifyToken,
}

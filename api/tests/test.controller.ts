import { Request, Response } from 'express'
import { IUserModel, UserModel } from '../../models/user.model'
import { StatusCodes } from 'http-status-codes'
import { userService } from '../user/user.service'

const createTestUser = async (
  request: Request,
  response: Response,
): Promise<any> => {
  try {
    console.log(request.body)

    const user = await userService.getUserByEmail('johndoe@example.com')

    if (user) throw new Error('User already exists user:' + user.name)

    const newUser: IUserModel = await _createUser()

    return response
      .status(StatusCodes.OK)
      .send({ message: 'User created successfully', user: newUser.name })
  } catch (error: any) {
    console.error('❌ Error creating user:', error.message)
    return response.status(StatusCodes.BAD_REQUEST).send(error.message)
  }
}

const _createUser = async () => {
  try {
    console.log('Creating a test user...')

    const email = 'johndodfe@example.com'

    const newUser: IUserModel = new UserModel({
      name: 'test',
      email,
      password: 'qwerty12345',
      birthday: new Date('1995-06-15'),
    })

    await newUser.save()
    return newUser
  } catch (error: any) {
    console.error('❌ Error in _createUserTest:', error.message)
    throw error
  }
}

export const testController = {
  createTestUser,
}

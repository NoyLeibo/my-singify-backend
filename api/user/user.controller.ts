import { userService } from './user.service'
import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { IUserModel, UserModel } from '../../models/user.model'
import { jwtService } from '../../utils/jwt'
import { validationHelper } from '../../utils/validationHelpers'

const getUser = async (request: Request, response: Response): Promise<any> => {
  try {
    const userId: string = request.params.id
    if (!userId) throw new Error('User ID is missing')

    let user = await userService.getUserById(userId)
    if (!user) {
      throw new Error('User not found')
    }

    const userObj = user.toObject()
    delete userObj.password

    return response.status(StatusCodes.OK).send(userObj)
  } catch (error: any) {
    console.log(error.message)
    return response.status(StatusCodes.BAD_REQUEST).send(error.message)
  }
}

const updateUser = async (
  request: Request,
  response: Response,
): Promise<any> => {
  try {
    const userId = request.params.id
    const updates = request.body
    if (updates._id) throw new Error('Cannot update user id')

    if (updates.email) {
      updates.email = updates.email.toLowerCase()
      const emailError = validationHelper.emailValidation(updates.email)
      if (emailError)
        return response.status(StatusCodes.BAD_REQUEST).send(emailError)
    }

    const { updatedUser, token } = await userService.updateUserById(
      userId,
      updates,
    )

    if (!updatedUser) {
      return response
        .status(StatusCodes.NOT_FOUND)
        .send({ message: 'User not found' })
    }

    return response.status(StatusCodes.OK).send({ updatedUser, token })
  } catch (error: any) {
    console.log(error.message)
    return response.status(StatusCodes.BAD_REQUEST).send(error.message)
  }
}

const removeUser = async (
  request: Request,
  response: Response,
): Promise<any> => {
  try {
    const userId = (request.user as any)?.id
    if (!userId) throw new Error('User ID is missing')

    // await userService.remove(userId)

    response.status(StatusCodes.OK).send('User removed successfully')
  } catch (error: any) {
    console.log(error.message)
    return response.status(StatusCodes.BAD_REQUEST).send(error.message)
  }
}

export const userController = {
  getUser,
  updateUser,
  removeUser,
}

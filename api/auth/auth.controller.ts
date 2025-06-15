import { Request, Response } from 'express'
import { authService } from './auth.service'
import { StatusCodes } from 'http-status-codes'
import { userService } from '../user/user.service'
import { validationHelper } from '../../utils/validationHelpers'

const signup = async (request: Request, response: Response): Promise<any> => {
  try {
    const { name, email, password, birthday } = request.body
    const requiredField = !name || !email || !password
    if (requiredField) {
      return response
        .status(StatusCodes.BAD_REQUEST)
        .send('All fields are required')
    }
    const passwordString: string = String(password)

    const normalizedEmail = email.toLowerCase()

    const nameError = validationHelper.nameValidation(name)
    if (nameError)
      return response.status(StatusCodes.BAD_REQUEST).send(nameError)

    const emailError = validationHelper.emailValidation(normalizedEmail)
    if (emailError)
      return response.status(StatusCodes.BAD_REQUEST).send(emailError)

    const passwordError = validationHelper.passwordValidation(password)
    if (passwordError)
      return response.status(StatusCodes.BAD_REQUEST).send(passwordError)

    const existingUser = await userService.getUserByEmail(normalizedEmail)
    if (existingUser) {
      return response
        .status(StatusCodes.CONFLICT)
        .send('Email is already in use')
    }

    const { user, token } = await authService.register({
      name,
      email,
      password: passwordString,
      birthday,
    })

    return response.status(StatusCodes.CREATED).send({ user, token })
  } catch (error: any) {
    console.error('❌ Signup error:', error)
    return response
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(error.message)
  }
}

const login = async (request: Request, response: Response): Promise<any> => {
  const { email, password } = request.body
  console.log(request.body)

  if (!email || !password)
    return response
      .status(StatusCodes.BAD_REQUEST)
      .send('Email or password are missing.')

  const normalizedEmail = email.toLowerCase()

  try {
    const { loggedInUser, token } = await authService.login(
      normalizedEmail,
      password,
    )

    if (!loggedInUser && !token) {
      return response
        .status(StatusCodes.BAD_REQUEST)
        .send('Invalid email or password')
    } else {
      return response.status(StatusCodes.OK).send({ loggedInUser, token })
    }
  } catch (err: any) {
    console.error(err.message)
    response.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message)
  }
}

const changePassword = async (
  request: Request,
  response: Response,
): Promise<any> => {
  try {
    const { email, password } = request.body

    if (!email || !password) {
      return response
        .status(StatusCodes.BAD_REQUEST)
        .send('Email, password, and code are required')
    }

    const { updatedUser, token } = await authService.changePassword(
      email,
      password,
    )

    if (!updatedUser) {
      return response
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send('Failed to reset password')
    }

    response.status(StatusCodes.OK).send({ updatedUser, token })
  } catch (err: any) {
    console.error('Error in changePassword:', err.message)
    response
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send('Error in changePassword: ' + err.message)
  }
}
export const authController = {
  signup,
  login,
  changePassword,
}

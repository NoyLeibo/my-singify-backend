import { Request, Response } from 'express'
import { authService } from './auth.service'
import { StatusCodes } from 'http-status-codes'
import { userService } from '../user/user.service'
import { validationHelper } from '../../utils/validationHelpers'

const signup = async (request: Request, response: Response): Promise<any> => {
  try {
    const { name, email, password, birthday, gender } = request.body

    const requiredField = !name || !email || !password || !birthday || !gender
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

    const { user, userToken } = await authService.register({
      name,
      email,
      password,
      birthday,
      gender,
    })

    return response.status(StatusCodes.CREATED).send({ user, userToken })
  } catch (error: any) {
    console.error('❌ Signup error:', error)
    return response
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(error.message)
  }
}
const isEmailTaken = async (
  request: Request,
  response: Response,
): Promise<any> => {
  const { email } = request.body
  if (!email) {
    return response
      .status(StatusCodes.BAD_REQUEST)
      .send('Email is required to check existence')
  }
  try {
    const user = await authService.isEmailTaken(email)
    return response.status(StatusCodes.OK).send({ exists: user ? true : false })
  } catch (error: any) {
    console.error('Error checking email existence:', error.message)
    return response
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send('Error checking email existence')
  }
}

const login = async (request: Request, response: Response): Promise<any> => {
  const { emailOrName, password } = request.body
  const requiredField = !emailOrName || !password

  if (requiredField)
    return response
      .status(StatusCodes.BAD_REQUEST)
      .send('Email or password are missing.')

  if (typeof emailOrName !== 'string' || typeof password !== 'string') {
    return response
      .status(StatusCodes.BAD_REQUEST)
      .send('Invalid email or password format.')
  }

  try {
    // const { loggedInUser, token } =
    await authService.loginUserWithEmailOrName(emailOrName, password)
    return response.status(StatusCodes.OK).send('Login successful')

    // if (!loggedInUser && !token) {
    //   return response
    //     .status(StatusCodes.BAD_REQUEST)
    //     .send('Invalid email or password')
    // } else {
    // return response.status(StatusCodes.OK).send({ loggedInUser, token })
    // }
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
  isEmailTaken,
}

import bcrypt from 'bcrypt'
import { IUserModel, UserModel } from '../../models/user.model'
import { jwtService } from '../../utils/jwt'
import { userService } from '../user/user.service'
import nodemailer from 'nodemailer'
import { genderType } from '../../models/types'
import { decrypt } from 'dotenv'

const saltRounds: number = 10

interface registerScheme {
  name: string
  email: string
  password: string
  birthday: string
  gender: genderType
}

const register = async (userData: registerScheme) => {
  try {
    const { name, email, password, birthday, gender } = userData

    const hashedPassword = await bcrypt.hash(password, saltRounds)
    const birthDate = new Date(birthday)

    const isEmailExists = await userService.getUserByEmail(email)
    if (isEmailExists) {
      throw new Error('Email already exists')
    }

    console.log('Type of birthDate:', typeof birthDate)
    console.log('BirthDate:', birthDate)

    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
      birthday: birthDate,
      gender,
    })

    await newUser.save()

    const userToken = jwtService.createShortToken(newUser)
    const user = newUser.removeSensitiveData()

    return { user, userToken }
  } catch (error: any) {
    console.error('Error during registration:', error)
    throw new Error(error.message || 'Registration failed')
  }
}

const login = async (user: IUserModel, password: string) => {
  try {
    const userHashedPassword = user?.password
    if (!userHashedPassword || !password) {
      throw new Error('No password provided')
    }

    if (user) {
      const isPasswordCompared = await bcrypt.compare(
        password,
        userHashedPassword,
      )
      if (!isPasswordCompared) throw new Error('Invalid email or password')
    } else throw new Error('Invalid email or password')

    const token = jwtService.createShortToken(user)

    const loggedInUser = user.removeSensitiveData()

    return { loggedInUser, token }
  } catch (error: any) {
    console.error('Error during login:', error)
    throw new Error('Invalid email or password')
  }
}

const isEmailTaken = async (email: string) => {
  try {
    const user = await userService.getUserByEmail(email)
    return user
  } catch (error: any) {
    console.error('Error checking email existence:', error.message)
    throw new Error('Failed to check email existence')
  }
}

const loginUserWithEmailOrName = async (
  emailOrName: string,
  password: string,
) => {
  const userWithEmail = await userService.getUserByEmail(emailOrName)
  const userWithName = await userService.getUserByName(emailOrName)
  if (userWithEmail) {
    console.log('Logging in with email:', emailOrName)
    return await login(userWithEmail, password)
  } else if (userWithName) {
    return await login(userWithName, password)
  } else {
    throw new Error('User not found')
  }
}

const changePassword = async (email: string, newPassword: string) => {
  try {
    const userHashedPassword = await bcrypt.hash(newPassword, saltRounds)
    const user: IUserModel | null = await userService.getUserByEmail(email)
    if (!user) throw new Error('User not found')

    const isPasswordCompared = await bcrypt.compare(
      user.password,
      userHashedPassword,
    )

    if (isPasswordCompared) user.password = userHashedPassword

    await user.save()

    const token = jwtService.createShortToken(user)
    const updatedUser = user.removeSensitiveData()

    return { updatedUser, token }
  } catch (error: any) {
    console.error(error.message)
    throw new Error('Failed to change password')
  }
}

export const authService = {
  register,
  login: login,
  changePassword,
  loginUserWithEmailOrName,
  isEmailTaken,
}

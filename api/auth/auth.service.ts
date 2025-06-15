import bcrypt from 'bcrypt'
import { IUserModel, UserModel } from '../../models/user.model'
import { jwtService } from '../../utils/jwt'
import { userService } from '../user/user.service'
import nodemailer from 'nodemailer'

const saltRounds: number = 10

interface registerScheme {
  name: string
  email: string
  password: string
  birthday: string
}

const register = async (userData: registerScheme) => {
  const { name, email, password, birthday } = userData
  const [monthStr, dayStr, yearStr] = birthday.split('/')
  const day = Number(dayStr)
  const month = Number(monthStr)
  const year = Number(yearStr)

  const birthDate = new Date(year, month - 1, day)

  const hashedPassword = await bcrypt.hash(password, saltRounds)

  const newUser = new UserModel({
    name,
    email,
    password: hashedPassword,
    birthday: birthDate,
  })

  await newUser.save()

  const token = jwtService.createShortToken(newUser)
  const user = newUser.removeSensitiveData()

  return { user, token }
}

const login = async (email: string, password: string) => {
  try {
    const user = await userService.getUserByEmail(email)
    const userHashedPassword = user?.password

    if (user && userHashedPassword) {
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
  login,
  changePassword,
}

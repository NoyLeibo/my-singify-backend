import { IUserModel, UserModel } from '../../models/user.model'
import { jwtService } from '../../utils/jwt'

const getUserByEmail = async (email: string): Promise<IUserModel | null> => {
  try {
    return await UserModel.findOne({ email })
  } catch (error: any) {
    return error.message
  }
}
const getUserByName = async (name: string): Promise<IUserModel | null> => {
  try {
    return await UserModel.findOne({ name })
  } catch (error: any) {
    return error.message
  }
}

const getUserById = async (userId: string): Promise<IUserModel | null> => {
  try {
    return await UserModel.findById(userId).exec()
  } catch (error: any) {
    return error.message
  }
}

const updateUserById = async (
  userId: string,
  updates: object,
): Promise<any> => {
  try {
    const user = await UserModel.findByIdAndUpdate(userId, updates, {
      new: true,
      runValidators: true,
    })

    if (!user) {
      throw new Error('User not found')
    }
    const token = await jwtService.createToken(user)
    const updatedUser = user.removeSensitiveData()

    return { updatedUser, token }
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export const userService = {
  getUserById,
  getUserByEmail,
  updateUserById,
  getUserByName,
}

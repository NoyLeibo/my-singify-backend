import { model, Schema, Document, ObjectId, Date } from 'mongoose'

interface IUserModel extends Document {
  _id: ObjectId
  name: string
  password: string
  email: string
  birthday: Date
  createdAt: Date

  removeSensitiveData: () => Partial<IUserModel>
  removeAllData: () => Partial<IUserModel>
}

const UserSchema = new Schema<IUserModel>(
  {
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    birthday: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false },
)

UserSchema.methods.removeSensitiveData = function (): Partial<IUserModel> {
  //function for return user object
  const userObject = this.toObject()
  delete userObject.password
  return userObject
}

UserSchema.methods.removeAllData = function (): Partial<IUserModel> {
  //function for return user token
  return {
    _id: this._id,
    name: this.name,
  }
}

const UserModel = model<IUserModel>('UserModel', UserSchema, 'users')

export { UserModel, IUserModel, UserSchema }

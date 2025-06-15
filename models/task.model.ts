import { model, Schema, Document, ObjectId, Date } from 'mongoose'

interface ITaskModel extends Document {
  _id: ObjectId
  title: string
  description?: string
  isCompleted: boolean
  createdAt: Date
  updatedAt: Date

  removeSensitiveData: () => Partial<ITaskModel>
  removeAllData: () => Partial<ITaskModel>
}

const TaskSchema = new Schema<ITaskModel>(
  {
    title: { type: String, required: true },
    description: { type: String, required: false, default: '' },
    isCompleted: { type: Boolean, required: true, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { versionKey: false },
)

TaskSchema.methods.removeSensitiveData = function (): Partial<ITaskModel> {
  //function for return task object
  return this.toObject()
}

const TaskModel = model<ITaskModel>('TaskModel', TaskSchema, 'users')

export { TaskModel, ITaskModel, TaskSchema }

import { TaskModel } from '../../models/task.model'

const createTask = async (title: string, description: string) => {
  try {
    const newTask = new TaskModel({
      title,
      description,
    })

    return newTask
  } catch (error: any) {
    throw new Error('Error on CreateTask' + error.message)
  }
}

const validateTask = (title: string, description?: string) => {
  if (!title) throw new Error('No Title')
  if (description) {
    if (description.length < 3 || description.length > 50)
      throw new Error('Description is too short or too high')
  }
}

export const taskService = { createTask, validateTask }

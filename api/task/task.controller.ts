import { StatusCodes } from 'http-status-codes'
import { Request, Response } from 'express'
import { taskService } from './task.service'

{
  /* 
  title: string
  description?: string
  isCompleted: boolean
  createdAt: Date
  updatedAt: Date
  
*/
}

const createTask = async (
  request: Request,
  response: Response,
): Promise<any> => {
  try {
    const { title, description } = request.body

    const isTaskValitaded = taskService.validateTask(title, description)

    const newTask = await taskService.createTask(title, description)

    console.log(newTask)

    return response.status(StatusCodes.OK).send('Task has been created')
  } catch (error: any) {
    return response
      .status(StatusCodes.BAD_REQUEST)
      .send('Error in createTask function')
  }
}

const getTasks = async (request: Request, response: Response): Promise<any> => {
  try {
    return response
      .status(StatusCodes.OK)
      .send('Task has been created' + 'TASK VARIABLE')
  } catch (error: any) {
    return response
      .status(StatusCodes.BAD_REQUEST)
      .send('Error in getTasks function')
  }
}

export const taskController = { getTasks, createTask }

import { dataSource } from "src/config/typeorm.config"
import { Task } from "./task.entity"
import { TaskStatus } from "utils/enums"
import { CreateTaskDTO } from "./dto"


export const TaskRepository = dataSource.getRepository(Task).extend({

    async createTask(body: CreateTaskDTO): Promise<Task>{
        const {title, description} = body

        const task: Task = new Task()
        task.title = title
        task.description = description
        task.status = TaskStatus.OPEN

        await task.save()

        return task    
    }
    
})
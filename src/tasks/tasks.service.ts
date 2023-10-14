import { Delete, Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from 'utils/enums';
import { CreateTaskDTO, UpdateTaskDTO } from './dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {
    constructor(
    ){}

    // getAllTasks(): Task[] {
    //     return this.tasks
    // }

    // getTasksByFilter(queries: GetTasksFilterDTO): Task[]{
    //     const { status, search } = queries 

    //     let tasks = this.getAllTasks()

    //     if(status){
    //         tasks = tasks.filter(task => task.status === status)
    //     }

    //     if(search){
    //         tasks = tasks.filter(task => (
    //             task.title.includes(search) ||
    //             task.description.includes(search)
    //         ))
    //     }

    //     return tasks
    // }

    async getTaskById(id: number): Promise<Task>{
        
        const task = await TaskRepository.findOneBy({id})
        
        if(!task){
            throw new NotFoundException(`Task with id: '${id}' does not exist.`)
        }

        return task
    }

    async createTask(body: CreateTaskDTO): Promise<Task> {
        return TaskRepository.createTask(body)
    }

    async updateTaskById(id: number, status: TaskStatus): Promise<Task> {
        const task = await this.getTaskById(id)
        task.status = status

        await task.save()

        return task
    }

    
    async deleteTaskById(id: number){
        const result = await TaskRepository.delete(id)

        if(result.affected === 0){
            throw new NotFoundException(`Task with id: '${id}' does not exist.`)
        }

    }
}

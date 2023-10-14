import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDTO, UpdateTaskDTO } from './dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { TaskStatus } from 'utils/enums';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService){}

    // @Get()
    // getTasks(@Query() queries: GetTasksFilterDTO): Task[]{
    //     if(Object.keys(queries).length){
    //         return this.tasksService.getTasksByFilter(queries)
    //     }
    //     else{
    //         return this.tasksService.getAllTasks()
    //     }
    // }

    @Get("/:id")
    getTaskById(@Param("id", ParseIntPipe) id: number): Promise<Task> {
        return this.tasksService.getTaskById(id)
    }

    @Post()
    createTask(@Body() body: CreateTaskDTO) : Promise<Task> {
        return this.tasksService.createTask(body)
    }

    @Patch("/status/:id")
    updateTaskStatus(@Param("id", ParseIntPipe) id: number, @Body("status", TaskStatusValidationPipe) status: TaskStatus): Promise<Task>{
        return this.tasksService.updateTaskById(id, status)
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete("/:id")
    deleteTaskById(@Param("id",  ParseIntPipe) id: number){
        return this.tasksService.deleteTaskById(id)
    }
    

}

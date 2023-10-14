import { IsIn, IsNotEmpty, IsOptional } from "class-validator";
import { AllTaskStatus, TaskStatus } from "utils/enums";

export class GetTasksFilterDTO{
    @IsOptional()
    @IsIn(AllTaskStatus)
    status: TaskStatus

    @IsOptional()
    @IsNotEmpty()
    search: string
}
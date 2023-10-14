import { TaskStatus } from "utils/enums"

export class UpdateTaskDTO{
    title? : string
    description? : string
    status?: TaskStatus
}
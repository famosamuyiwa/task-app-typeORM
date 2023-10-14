import { BadRequestException } from "@nestjs/common";
import { PipeTransform } from "@nestjs/common/interfaces";
import { AllTaskStatus } from "utils/enums";

export class TaskStatusValidationPipe implements PipeTransform{

    transform(value: any) {
        value = value.toUpperCase()

        if(!this.isStatusValid(value)){
            throw new BadRequestException(`'${value}' is an invalid status`)
        }

        return value
    }

    private isStatusValid(status: any){
        const idx = AllTaskStatus.indexOf(status)
        return idx !== -1
    }
}
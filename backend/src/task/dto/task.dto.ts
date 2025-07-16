import { Transform } from "class-transformer";
import { IsBoolean, IsDate, IsEnum, IsInt, IsOptional, IsString } from "class-validator";
import { Priority } from "generated/prisma";

export class CreateTaskDto {
    @IsString()
    title: string

    @IsString()
    @IsOptional()
    description?: string

    @IsOptional()
    @IsBoolean()
    completed?: boolean

    @IsOptional()
    @IsInt()
    order?: number

    @IsEnum(Priority)
    @IsOptional()
    @Transform(({ value }) => ('' + value).toLowerCase())
    priority?: Priority
    
    @IsString()
    taskCategoryId: string
}

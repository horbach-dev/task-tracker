import { IsInt, IsOptional, IsString } from "class-validator";

export class CreateTaskCategoryDto {
    @IsString()
    title: string

    @IsOptional()
    @IsInt()
    order?: number

    @IsString()
    projectId: string
}

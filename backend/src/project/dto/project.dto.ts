import { IsString, MinLength } from "class-validator";

export class CreateProjectDto {
    @IsString()
    @MinLength(3, { message: 'Заголовок должен содержать минимум 3 символа' })
    title: string

    @IsString()
    description: string
}

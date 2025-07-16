import {
	Body,
	Controller,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	Delete,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { TaskService } from './task.service'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { CreateTaskDto } from './dto/task.dto'
import { CreateTaskCategoryDto } from './dto/task-category.dto'

@Controller('tasks')
export class TaskController {
	constructor(private readonly taskService: TaskService) {}

	@Get()
	@Auth()
	async getAll(@CurrentUser('id') userId: string) {
		return this.taskService.getAll(userId)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('category')
	@Auth()
	async createCategory(@Body() dto: CreateTaskCategoryDto) {
		return this.taskService.createCategory(dto)
	}
	
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post() 
	@Auth()
	async create(@Body() dto: CreateTaskDto, @CurrentUser('id') userId: string) {
		return this.taskService.create(dto, userId)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Put(':id')
	@Auth()
	async update(
		@Body() dto: CreateTaskDto,
		@CurrentUser('id') userId: string,
		@Param('id') taskId: string
	) {
		return this.taskService.update(dto, userId, taskId)
	}

	@HttpCode(200)
	@Delete(':id')
	@Auth()
	async delete(@Param('id') taskId: string) {
		return this.taskService.delete(taskId)
	}
}

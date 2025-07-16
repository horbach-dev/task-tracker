import {
	Body,
	Controller,
	Get,
	HttpCode,
	Post,
	Param,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { ProjectService } from './project.service'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CreateProjectDto } from './dto/project.dto'

@Controller('project')
export class ProjectController {
	constructor(private readonly projectService: ProjectService) {}

	@Get()
	@Auth()
	async getAll() {
		return this.projectService.getAll()
	}

	@Auth()
	@Get(':id')
	async getById(@Param('id') projectId: string) {
		return this.projectService.findOne(projectId)
	}
	
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post() 
	@Auth()
	async create(@Body() dto: CreateProjectDto) {
		return this.projectService.create(dto)
	}
}

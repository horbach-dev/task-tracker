import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { CreateProjectDto } from './dto/project.dto'

@Injectable()
export class ProjectService {
	constructor(private prisma: PrismaService) {}

	async create(dto: CreateProjectDto) {
		let result = {}

		try {
			result = await this.prisma.project.create({ data: dto })
		} catch(e) {
			console.log('Проблема создания проекта', e)
		}
		


		return result
	}

	findOne(id: string) {
		return this.prisma.project.findUnique({
			where: { id },
			include: {
				taskCategories: true
			}
		})
	}

	getAll() {
		return this.prisma.project.findMany()
	}
}

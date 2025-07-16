import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { CreateTaskDto } from './dto/task.dto'
import { CreateTaskCategoryDto } from './dto/task-category.dto'

@Injectable()
export class TaskService {
	constructor(private prisma: PrismaService) {}

	async createCategory(dto: CreateTaskCategoryDto) {
		return this.prisma.taskCategory.create({
			data: dto
		})
	}

	async create({ taskCategoryId, ...dto }: CreateTaskDto, userId: string) {	
		let result = {}

		try {
			result = await this.prisma.task.create({
				data: {
					...dto,
					user: {
						connect: {
							id: userId
						}
					},
					taskCategory: {
						connect: {
							id: taskCategoryId
						}
					}
				}
			})
		} catch(e) {
			console.log('Проблема создания таски', e)
		}
		


		return result
	}

	async update(dto: Partial<CreateTaskDto>, userId: string, taskId: string) {		
		return this.prisma.task.update({
			where: {
				userId,
				id: taskId
			},
			data: dto
		})
	}

	async delete(taskId: string) {		
		return this.prisma.task.delete({
			where: {
				id: taskId
			}
		})
	}

	findOne(id: string) {
		return this.prisma.task.findUnique({
			where: { id },
		})
	}

	getAll(userId: string) {
		return this.prisma.task.findMany({
			where: { userId }
		})
	}
}

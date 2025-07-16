import {
	Controller,
	Get,
	HttpCode,
	Req,
	Res
} from '@nestjs/common'
import { UserService } from './user.service'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { Auth } from 'src/auth/decorators/auth.decorator'

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get()
	@Auth()
	@HttpCode(200)
	async getUser(@CurrentUser('id') userId: string) {
		const data = await this.userService.findOne(userId)
		return data
	}
}

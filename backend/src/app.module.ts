import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'
import { TaskModule } from './task/task.module'
import { ProjectModule } from './project/project.module'

@Module({
	imports: [ConfigModule.forRoot(), AuthModule, UserModule, ProjectModule, TaskModule],
})
export class AppModule {}

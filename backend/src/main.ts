import 'dotenv/config'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as cookieParser from 'cookie-parser'

const frontEndUrl = process.env.FRONTEND_URL ?? 'http://localhost:3001'
const port = process.env.PORT ?? 3000

async function bootstrap() {
	try {
		const app = await NestFactory.create(AppModule)

		app.setGlobalPrefix('api')
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		app.use(cookieParser())
		app.enableCors({
			origin: [frontEndUrl],
			credentials: true,
			exposedHeaders: 'set-cookie',
		})

		await app.listen(port)

		console.log(`App listening on port ${port}`)
	} catch (error) {
		console.error('Bootstrap Error', JSON.stringify(error))
	}
}

bootstrap()

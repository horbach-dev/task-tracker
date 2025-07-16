import { IsEmail, IsString, MinLength } from 'class-validator'

export class AuthDto {
	@IsEmail({},{ message: 'Введите корректный email' })
	email: string

	@MinLength(6, { message: 'Пароль должен содержать минимум 6 символов' })
	@IsString({ message: 'Пароль должен быть строкой' })
	password: string
}

import {
    BadRequestException,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UserService } from 'src/user/user.service'
import { AuthDto } from './dto/auth.dto'
import { verify } from 'argon2'
import { Response } from 'express'

@Injectable()
export class AuthService {
    EXPIRE_DAY_REFRESH_TOKEN = 7
    REFRESH_TOKEN_NAME = 'refreshToken'

	constructor(
		private jwt: JwtService,
		private userService: UserService,
	) {}

    async login(dto: AuthDto) {  
        const { password, ...user } = await this.validateUser(dto)
        const tokens = this.issueTokens(user.id)

        return {
            user,
            ...tokens
        }
    }

    async register(dto: AuthDto) {  
        const oldUser = await this.userService.getByEmail(dto.email)

        if (oldUser) throw new BadRequestException('Такой пользователь уже существует')

        const { password, ...user } = await this.userService.create(dto)

        const tokens = this.issueTokens(user.id)

        return {
            user,
            ...tokens
        }
    }

    private issueTokens (userId: string) {
        const data = {id: userId}

        const accessToken = this.jwt.sign(data, {
            expiresIn: '15m'
        })

        const refreshToken = this.jwt.sign(data, {
            expiresIn: `${this.EXPIRE_DAY_REFRESH_TOKEN}d`
        })

        return { accessToken, refreshToken }
    }

    async getNewTokens(refreshToken: string) {
        const result = await this.jwt.verify(refreshToken)

        if (!result) {
            throw new UnauthorizedException('Invalid refresh token')
        }

        //@ts-ignore
        const { password, ...user } = await this.userService.findOne(result.id)
        const tokens = this.issueTokens(user.id)

        return {
            user,
            ...tokens,
        }
    }

    private async validateUser (dto: AuthDto) {
        const user = await this.userService.getByEmail(dto.email)

        if (!user) {
            throw new NotFoundException('Пользователь с таким email не найден')
        }

        const isValid = await verify(user.password, dto.password)

        if (!isValid) {
            throw new UnauthorizedException('Пароль не верный')
        }

        return user
    }

    addRefreshTokenToResponse(res: Response, refreshToken: string) {
        const expiresIn = new Date()
        expiresIn.setDate(expiresIn.getDate() + this.EXPIRE_DAY_REFRESH_TOKEN)

        res.cookie(this.REFRESH_TOKEN_NAME, refreshToken, {
            httpOnly: true,
            // domain: process.env.DOMAIN,
            expires: expiresIn,
            // secure: true,
            sameSite: process.env.MODE === 'development' ? 'lax' : 'lax'
        })
    }

    removeRefreshTokenFromResponse(res: Response) {
        res.cookie(this.REFRESH_TOKEN_NAME, '', {
            httpOnly: true,
            // domain: process.env.DOMAIN,
            expires: new Date(0),
            // secure: true,
            sameSite: process.env.MODE === 'development' ? 'lax' : 'lax'
        })
    }
}

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import LoginUserDto from 'src/users/dto/login.dto';
import { compareSync } from 'bcrypt';
import { ReadUserDto } from 'src/users/dto/read-user.dto';
import { PrismaService } from 'src/core/prisma.service';
import { JWT_EXPIRES_IN, JWT_SECRET } from 'src/constants';

@Injectable()
export class AuthService {
  constructor(private readonly db: PrismaService) {}

  // ###################################################################### auth sections ######################################################################
  async login(loginUserDto: LoginUserDto) {
    const user = await this.db.user.findUnique({
      where: { email: loginUserDto.email },
    });
    if (!user) {
      throw new NotFoundException('User Not Found');
    }
    const isPasswordCorrect = compareSync(loginUserDto.password, user.password);

    if (!isPasswordCorrect) {
      throw new BadRequestException('Password is incorrect');
    }

    const access_token = jwt.sign(
      { _id: user.id, email: user.email, isAdmin: user.isAdmin },
      JWT_SECRET,
      {
        expiresIn: JWT_EXPIRES_IN,
      },
    );

    return { user: new ReadUserDto(user), access_token: access_token };
  }
}

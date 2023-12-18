import {
  NestMiddleware,
  HttpStatus,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { JWT_SECRET } from 'src/constants';
import { PrismaService } from 'src/core/prisma.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly db: PrismaService) {}

  async use(req: Request, _res: Response, next: NextFunction) {
    const authHeaders = req.headers.authorization;
    if (authHeaders && (authHeaders as string).split(' ')[1]) {
      try {
        const token = (authHeaders as string).split(' ')[1];
        const decoded: any = jwt.verify(token, JWT_SECRET);
        const user = await this.db.user.findUnique({
          where: {
            id: decoded._id,
          },
        });

        if (!user) {
          throw new HttpException('User not found.', HttpStatus.UNAUTHORIZED);
        }

        req['user'] = user;
      } catch (error) {
        throw new BadRequestException('Invalid access token');
      }
      next();
    } else {
      throw new HttpException('Not authorized.', HttpStatus.UNAUTHORIZED);
    }
  }
}

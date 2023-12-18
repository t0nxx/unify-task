import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { hashSync } from 'bcrypt';
import { ReadUserDto } from './dto/read-user.dto';
import { PrismaService } from 'src/core/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly db: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.db.user.findUnique({
      where: { email: createUserDto.email },
    });
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    createUserDto.password = hashSync(createUserDto.password, 10);
    const user = await this.db.user.create({ data: createUserDto });
    return new ReadUserDto(user);
  }

  async findOne(id: string) {
    const user = await this.db.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('User Not Found');
    }
    return new ReadUserDto(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.db.user.update({
      where: { id },
      data: updateUserDto,
    });
    return new ReadUserDto(user);
  }

  async remove(id: string) {
    await this.db.user.delete({ where: { id } });
    return 'success';
  }
}

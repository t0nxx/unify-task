import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { PrismaService } from 'src/core/prisma.service';
import { ClsService } from 'nestjs-cls';

@Injectable()
export class TodosService {
  constructor(
    private readonly db: PrismaService,
    private readonly appStorage: ClsService,
  ) {}

  async create(createTodoDto: CreateTodoDto) {
    const currentUser = this.appStorage.get('user');
    const todo = await this.db.todo.create({
      data: { userId: currentUser?.id, ...createTodoDto },
    });
    return todo;
  }

  async findOne(id: string) {
    const todo = await this.db.todo.findUnique({ where: { id } });
    if (!todo) {
      throw new NotFoundException('Todo Not Found');
    }
    return todo;
  }

  async update(id: string, updateTodoDto: UpdateTodoDto) {
    const todo = await this.db.todo.findUnique({ where: { id } });
    if (!todo) {
      throw new NotFoundException('Todo Not Found');
    }
    await this.db.todo.update({
      where: { id },
      data: updateTodoDto,
    });
    return todo;
  }

  async remove(id: string) {
    const todo = await this.db.todo.findUnique({ where: { id } });
    if (!todo) {
      throw new NotFoundException('Todo Not Found');
    }
    // delete todo , add auth check , ownership check
    const currentUser = this.appStorage.get('user');
    if (currentUser.id !== todo.userId) {
      throw new UnauthorizedException('Sorry you are not the owner');
    }
    await this.db.todo.delete({ where: { id } });
    return 'succssfully deleted';
  }

  //
  async getAllForCurrentUser() {
    const currentUser = this.appStorage.get('user');

    const todos = await this.db.todo.findMany({
      where: { userId: currentUser?.id },
    });

    return todos;
  }
}

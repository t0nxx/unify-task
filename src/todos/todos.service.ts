import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { PrismaService } from 'src/core/prisma.service';

@Injectable()
export class TodosService {
  constructor(private readonly db: PrismaService) {}

  async create(createTodoDto: CreateTodoDto) {
    const todo = await this.db.todo.create({ data: createTodoDto });
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
    const todo = await this.db.user.update({
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

    await this.db.todo.delete({ where: { id } });
    return 'succssfully deleted';
  }
}

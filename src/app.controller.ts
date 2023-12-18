import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.appService.create(createUserDto);
  }

  @Get('getOne/:id')
  findOne(@Param('id') id: string) {
    return this.appService.findOne(id);
  }

  @Patch('updateOne/:id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.appService.update(id, updateUserDto);
  }

  @Delete('deleteOne/:id')
  remove(@Param('id') id: string) {
    return this.appService.remove(id);
  }
}

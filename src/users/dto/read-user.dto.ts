import { CreateUserDto } from './create-user.dto';
import { Exclude } from 'class-transformer';

export class ReadUserDto {
  @Exclude()
  password?: string;

  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;

  constructor(partial: Partial<CreateUserDto>) {
    Object.assign(this, partial);
  }
}

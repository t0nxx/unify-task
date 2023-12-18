import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { CoreModule } from 'src/core/core.module';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [UsersModule, CoreModule],
})
export class AuthModule {}

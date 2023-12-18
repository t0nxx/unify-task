import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './todos/todos.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { ClsModule } from 'nestjs-cls';

@Module({
  imports: [
    TodosModule,
    UsersModule,
    AuthModule,
    CoreModule,
    // simulate localstorage , for share req user object accross the cycle of request
    ClsModule.forRoot({
      middleware: {
        // automatically mount to all routes
        mount: true,
        setup: (cls, req) => {
          cls.set('user', req.user || null);
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

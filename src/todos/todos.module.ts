import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { CoreModule } from 'src/core/core.module';
import { AuthMiddleware } from 'src/auth/auth.middleware';
import { ClsModule } from 'nestjs-cls';

@Module({
  controllers: [TodosController],
  providers: [TodosService],
  imports: [CoreModule, ClsModule],
})
export class TodosModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'todos', method: RequestMethod.POST },
        { path: 'todos/:id', method: RequestMethod.PUT },
        { path: 'todos/:id', method: RequestMethod.DELETE },
      );
  }
}

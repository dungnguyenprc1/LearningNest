import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TasksService } from './tasks/tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './tasks/task.entity';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/user.entity';
import { AccountModule } from './account/account.module';
import { Account } from './account/account.entity';

@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'postgres',
      entities: [Task, User, Account],
      synchronize: true,
    }),
    AuthModule,
    AccountModule,
  ],
  // providers: [TasksService],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}

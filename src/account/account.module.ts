import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountService } from './account.service';
import { Account } from './account.entity';
import { AccountController } from './account.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Account]), AuthModule],
  providers: [AccountService],
  controllers: [AccountController],
})
export class AccountModule {}

import {
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { Account } from './account.entity';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { TransformInterceptor } from 'src/common/interceptors/interceptors.interceptor';

@Controller('/api/app/account')
@UseGuards(AuthGuard())
@UseInterceptors(TransformInterceptor)
export class AccountController {
  constructor(private accountService: AccountService) {}
  @Get('/profile')
  profileAccount(@GetUser() user: User): Promise<Account> {
    return this.accountService.getProfile(user);
  }
}

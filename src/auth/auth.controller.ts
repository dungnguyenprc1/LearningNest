import {
  Body,
  Controller,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('/api/app/authorize')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/register')
  signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.createUser(authCredentialsDto);
  }
  @Post('/login')
  signIn(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto);
  }
  // @Post('/test')
  // @UseGuards(AuthGuard())
  // test(@Request() req) {
  //   console.log(req);
  // }
}

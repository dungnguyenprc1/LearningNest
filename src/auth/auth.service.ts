import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}
  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const {
      username,
      password,
      salutation,
      fullName,
      membershipType,
      statusMembership,
      mobileNo,
      expiredDate,
      dateOfBirth,
    } = authCredentialsDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = this.userRepository.create({
      username,
      password: hashedPassword,
      salutation,
      fullName,
      membershipType,
      mobileNo,
      expiredDate,
      dateOfBirth,
      statusMembership,
    });
    try {
      await this.userRepository.save(user);
    } catch (err) {
      console.log(err.code);
      if ((err.code = '23505')) {
        throw new ConflictException('Username already existed');
      } else if ((err.code = '22007')) {
        throw new BadRequestException('Bad Request');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = authCredentialsDto;
    const user = await this.userRepository.findOne({ where: { username } });
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { username };
      const accessToken: string = this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Plesase check password again11');
    }
  }
}

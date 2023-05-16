import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from './account.entity';
import { Repository } from 'typeorm';
import { User } from 'src/auth/user.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>, // @InjectRepository(User) // private userRepository: Repository<User>,
  ) {}
  async getProfile(user: User): Promise<Account> {
    const {
      mobileNo,
      fullName,
      membershipType,
      expiredDate,
      username,
      salutation,
      dateOfBirth,
    } = user;

    const profile = this.accountRepository.create({
      mobileNo,
      fullName,
      membershipType,
      expiredDate,
      username,
      user,
      salutation,
      dateOfBirth,
    });
    // console.log(profile);
    await this.accountRepository.save(profile);
    return profile;
  }
}

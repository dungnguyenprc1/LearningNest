import { Matches } from 'class-validator';
import { MembershipType, Salutation, StatusMembership } from '../auth.enum';

export class AuthCredentialsDto {
  username: string;
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password is week',
  })
  password: string;
  salutation: Salutation;
  fullName: string;
  membershipType: MembershipType;
  statusMembership: StatusMembership;
  mobileNo: string;
  expiredDate: Date;
  dateOfBirth: Date;
}

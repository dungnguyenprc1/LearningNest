import { User } from 'src/auth/user.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

// @EntityRepository()
@Entity()
export class Account {
  @PrimaryGeneratedColumn('uuid')
  userId: string;
  @Column()
  mobileNo: string;
  @Column()
  fullName: string;
  @Column()
  membershipType: string;
  @Column()
  expiredDate: Date;
  @Column()
  userName: string;
  @Column()
  dateOfBirth: Date;
  @Column()
  salutation: string;
  @OneToOne((_type) => User, (user) => user.account)
  user: User;
}

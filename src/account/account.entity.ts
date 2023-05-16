import { Exclude } from 'class-transformer';
import { User } from 'src/auth/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

// @EntityRepository()
@Entity()
export class Account {
  @PrimaryGeneratedColumn('uuid')
  userId: string;
  @Column({ nullable: true })
  mobileNo: string;
  @Column({ nullable: true })
  fullName: string;
  @Column({ nullable: true })
  membershipType: string;
  @Column({ nullable: true })
  expiredDate: Date;
  @Column({ nullable: true })
  username: string;
  @Column({ nullable: true })
  dateOfBirth: Date;
  @Column({ nullable: true })
  salutation: string;
  @OneToOne((_type) => User, (user) => user.userId, { cascade: true })
  @JoinColumn({ name: 'userId' })
  @Exclude({ toPlainOnly: true })
  user: User;
}

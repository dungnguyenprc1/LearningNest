import { Task } from 'src/tasks/task.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MembershipType, Salutation, StatusMembership } from './auth.enum';
import { Exclude } from 'class-transformer';
import { Account } from 'src/account/account.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  userId: string;
  @Column({ nullable: true })
  salutation: Salutation;
  @Column({ nullable: true })
  mobileNo: string;
  @Column({ type: 'timestamptz', nullable: true })
  expiredDate: Date;
  @Column({ nullable: true })
  membershipType: MembershipType;
  @Column({ type: 'timestamptz', nullable: true })
  dateOfBirth: Date;
  @Column({ nullable: true })
  statusMembership: StatusMembership;
  @Column({ nullable: true })
  fullName: string;
  @Column({ unique: true })
  username: string;
  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;
  @Column({ nullable: true })
  designation: string;
  @OneToMany((_task) => Task, (task) => task.user, { eager: true })
  task: Task[];
  @OneToOne((_type) => Account, (account) => account.user, {
    cascade: true,
    // eager: true,
  })
  @JoinColumn()
  account: Account;
}

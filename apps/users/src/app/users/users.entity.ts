import { UserRole } from '@webal-nest/interfaces';
import {
  Entity,
  PrimaryColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
  Index,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity()
export class User {
  @PrimaryColumn('uuid')
  id: string;

  @BeforeInsert()
  generateId() {
    this.id = uuid();
  }

  @Column({ type: 'timestamp with time zone', default: () => new Date() })
  createdAt: Date;

  @Column({ type: 'timestamp with time zone', default: () => new Date() })
  updatedAt: Date;

  @BeforeInsert()
  generateCreatedAt() {
    this.createdAt = new Date();
  }

  @BeforeUpdate()
  updateDates() {
    this.updatedAt = new Date();
  }

  @Column({ type: 'varchar', nullable: false, length: 127 })
  @Index({ unique: true })
  email: string;

  @Column({
    type: 'varchar',
    length: 60,
  })
  password: string;

  @Column({
    type: 'boolean',
    default: true,
  })
  isActive: boolean;

  @Column({
    type: 'varchar',
    length: '20',
    nullable: true,
  })
  emailToken: string;

  @Column({
    type: 'varchar',
    length: 60,
  })
  firstName: string;

  @Column({
    type: 'varchar',
    length: 60,
  })
  lastName: string;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  phone: string;

  @Column({
    type: 'varchar',
    length: 12,
    enum: UserRole,
    default: UserRole.User,
  })
  role: UserRole;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  avatar: string;

  @Column({
    type: 'boolean',
    default: false,
  })
  deleted: boolean;
}

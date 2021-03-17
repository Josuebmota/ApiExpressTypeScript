import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Exclude, Expose } from 'class-transformer';
import upload from '@config/upload';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255, name: 'social_name' })
  socialName: string;

  @Column({ length: 255, name: 'first_name' })
  firstName: string;

  @Column({ length: 255, name: 'last_name' })
  lastName: string;

  @Column({ name: 'birth_date' })
  birthDate: Date;

  @Column({ length: 255 })
  email: string;

  @Exclude()
  @Column({ length: 255 })
  password: string;

  @Column({ length: 500 })
  avatar: string;

  @Column()
  status: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Expose({ name: 'avatar_url' })
  getAvatarUrl(): string | null {
    if (!this.avatar) return null;

    switch (upload.driver) {
      case 'disk':
        return this.avatar
          ? `${process.env.APP_API_URL}/files/${this.avatar}`
          : null;
      case 's3':
        return `https://${upload.config.s3.bucket}.s3.amazonaws.com/${this.avatar}`;

      default:
        return null;
    }
  }
}

export default User;

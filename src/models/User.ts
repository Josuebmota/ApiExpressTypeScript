import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({length:255, name:"social_name"})
  socialName: string;

  @Column({length:255, name:"first_name"})
  firstName: string;

  @Column({length:255, name:"last_name"})
  lastName: string;

  @Column({name:"birth_date"})
  birthDate: Date;

  @Column({length:255})
  email: string;

  @Column({length:255})
  password: string;

  @Column({length:255, name:"img_profile"})
  imgProfile: string;

  @Column()
  status: string;

  @CreateDateColumn({name:'created_at'})
  createdAt: Date;

  @UpdateDateColumn({name:'updated_at'})
  updatedAt: Date;
}

export default User;

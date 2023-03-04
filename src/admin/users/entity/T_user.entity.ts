import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('T_USER')
export class T_UserEntity {
  @PrimaryGeneratedColumn()
  c_index: number;
  
  @PrimaryColumn()
  c_id: string;

  @Column({ length: 30 })
  c_name: string;

  @Column({ length: 60 })
  c_email: string;

  @Column({ length: 300 })
  c_password: string;

  @Column({ length: 60 })
  c_signupVerifyToken: string;

  @Column({ nullable: true, default: 'W' })
  c_status: string;

  @Column({ nullable: true, default: 0 })
  c_create_user_index: number;

  @Column({ nullable: true })
  c_create_date: Date;

  @Column({ nullable: true, default: 0 })
  c_update_user_index: number;

  @Column({ nullable: true })
  c_update_date: Date;


}
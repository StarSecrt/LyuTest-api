import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('T_BUSINESS_PARTNER')
export class T_BusinessPartnerEntity {
  @PrimaryGeneratedColumn()
  c_index: number;

  @PrimaryColumn()
  c_code: string;

  @Column()
  c_name: string;

  @Column({ nullable: true })
  c_registration: string;

  @Column({ nullable: true })
  c_representative_name: string;

  @Column({ nullable: true })
  c_item: string;

  @Column({ nullable: true })
  c_type: string;

  @Column({ default: 'B' })
  c_group_code: string;

  @Column({ default: '거래처' })
  c_group_name: string;

  @Column({ default: 'Y' })
  c_headoffice_yn: string;

  @Column({ nullable: true })
  c_headoffice_code: string;

  @Column({ nullable: true })
  c_address: string;

  @Column({ nullable: true })
  c_post_code: string;

  @Column({ nullable: true })
  c_manager: string;

  @Column({ nullable: true })
  c_phone: string;

  @Column({ nullable: true })
  c_cell_phone: string;

  @Column({ nullable: true })
  c_fax: string;

  @Column({ nullable: true })
  c_mail: string;

  @Column({ nullable: true })
  c_bank_code: string;

  @Column({ nullable: true })
  c_bank_name: string;

  @Column({ nullable: true })
  c_bank_account_number: string;

  @Column({ nullable: true })
  c_pos_type: string

  @Column({ nullable: true })
  c_pos_id: number;

  @Column({ nullable: true })
  c_pos_shopid: number;

  @Column({ nullable: true })
  c_description: string;

  @Column({ default: 'I' })
  c_status: string;

  @Column({ nullable: true })
  c_create_user_index: number;

  @Column({ nullable: true })
  c_create_date: Date;

  @Column({ nullable: true })
  c_update_user_index: number;

  @Column({ nullable: true })
  c_update_date: Date;

}
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('T_INTERFACE_ITEM')
export class T_InterfaceItemEntity {
  @PrimaryGeneratedColumn()
  c_index: number;

  @Column()
  c_aspid: number;

  @Column()
  c_slrid: number;

  @Column({ nullable: true })
  c_item_header_index: number;

  @Column({ nullable: true })
  c_item_line_index: number;

  @Column({ nullable: true })
  c_item_code: string;

  @Column({ nullable: true })
  c_item_name: string;

  @Column()
  c_item_id: number;
  
  @Column({ nullable: true })
  c_reference_color: string;

  @Column({ nullable: true })
  c_item_size: string;

  @Column({ nullable: true })
  c_mixing_ratio: string;

  @Column({ nullable: true })
  c_supply_price: number;

  @Column({ nullable: true })
  c_item_reg_date: Date;

  @Column({ nullable: true })
  c_item_image1: string;
  
  @Column({ nullable: true })
  c_item_image2: string;

  @Column({ nullable: true })
  c_item_image3: string;

  @Column({ nullable: true })
  c_item_image4: string;

  @Column({ nullable: true })
  c_item_image5: string;

  @Column({ nullable: true })
  c_internal_barcode: string;

  @Column({ nullable: true })
  c_external_barcode: string;

  @Column({ nullable: true })
  c_available_stock: string;

  @Column({ nullable: true, default: 'I' })
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
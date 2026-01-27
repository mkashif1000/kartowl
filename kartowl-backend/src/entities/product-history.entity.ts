import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class ProductHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  productTitle: string;

  @Column()
  marketplace: string; // 'daraz', 'priceoye', etc.

  @Column('int')
  price: number;

  @Column()
  productUrl: string; // Unique identifier basically

  @CreateDateColumn()
  scrapedAt: Date;
}
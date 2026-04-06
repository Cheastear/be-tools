import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('short_links')
export class ShortLink {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  code!: string;

  @Column()
  originalUrl!: string;

  @Column({ default: 0 })
  clicks!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @Column({ type: 'timestamp' })
  expiresAt!: Date;
}

import { StockToken } from "@deepchain-labs/nest-modules-config";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("stock_tokens")
export class StockTokenEntity extends BaseEntity implements StockToken {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  address!: string;

  @Column()
  chain_id!: number;

  @Column()
  is_disabled!: boolean;
}

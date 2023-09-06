import { TradeSupportedToken } from "@deepchain-labs/nest-modules-config";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("trade_supported_tokens")
export class TradeSupportedTokenEntity
  extends BaseEntity
  implements TradeSupportedToken
{
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  symbol!: string;

  @Column()
  address!: string;

  @Column()
  is_disabled!: boolean;

  @Column()
  chain_id!: number;

  @Column()
  coingecko_id!: string;
}

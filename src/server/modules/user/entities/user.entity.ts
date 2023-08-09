import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  email!: string;

  @Column()
  name!: string;

  @Column()
  password!: string;

  @Column({
    type: "timestamp",
    default: new Date(),
  })
  created_at?: Date;

  @Column({
    type: "timestamp",
    default: new Date(),
  })
  updated_at?: Date;
}

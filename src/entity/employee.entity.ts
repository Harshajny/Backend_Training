import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  UpdateQueryBuilder,
} from "typeorm";
import { StringLiteral } from "typescript";
import AbstractEntity from "./abstract-entity";
import Address from "./address.entity";
import { Role } from "../utils/role.enum";
import Department from "./department.entity";

@Entity()
class Employee extends AbstractEntity {
  @Column()
  name: String;
  @Column()
  email: string;

  @Column({ nullable: true })
  age: number;

  @OneToOne(() => Address, (address) => address.employee, {
    cascade: true,
    //on calling an employee by id the address to gets updates
    onDelete: "CASCADE",
  })
  address: Address;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  role: Role;
  @ManyToOne(() => Department, (department) => department.employee)
  department: Department;
}

// }
export default Employee;

// @notation :decorators
//entity can access the id, name, email and all such attributes of Employee
//use repository function to access the crud operations

// we need to create a connection between the database and this so as to get the data
// we use orm for the same
//employee.ts and data-source.ts plays the main role in this

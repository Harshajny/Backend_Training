
import { IsEmail, IsEnum, isNotEmpty, IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";
import 'reflect-metadata'
import { Exclude, Type } from "class-transformer";
import Address from "../entity/address.entity";
import { Role } from "../utils/role.enum";
import Department from "../entity/department.entity";
import { CreateDepartmentDto } from "./department.dto";
import { createAddressDto } from "./address.dto";

export class CreateEmployeeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsNumber()
  age: number;

  @ValidateNested()
  @Type(() => createAddressDto)
  address: Address;

  @ValidateNested()
  @Type(() => CreateDepartmentDto)

  department: Department;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEnum(Role)
  role: Role;
}
export class EmployeeResponseDto extends CreateEmployeeDto {
  @Exclude()
    password: string;
  }
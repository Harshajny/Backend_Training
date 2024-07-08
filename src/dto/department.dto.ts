import {
    IsNotEmpty,
    IsOptional,
    IsString,
    ValidateNested,
  } from "class-validator";
  import { EmployeeResponseDto } from "./employee.dto";
  import { Type } from "class-transformer";
  import Employee from "../entity/employee.entity";
  
  export class CreateDepartmentDto {
    @IsString()
    @IsNotEmpty()
    name: string;
  }
  
  export class UpdateDepartmentDto {
    @IsString()
    @IsOptional()
    name: string;
  }
  
  export class DepartmentResponseDto {
    @IsString()
    @IsNotEmpty()
    name: string;
  
    @ValidateNested()
    @IsOptional()
    @Type(() => EmployeeResponseDto)
    employee: Employee;
  }
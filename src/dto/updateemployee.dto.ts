import { IsEmail, IsNotEmpty, IsNumber, IsString, ValidateNested, isEmail, isNotEmpty, isNumber, isString } from "class-validator"
import { isNullishCoalesce } from "typescript"
import Address from "../entity/address.entity"
import { Type } from "class-transformer"
import "reflect-metadata"

//fields with which we need to create an employee is added to the dto
export class UpdateEmployeeDto
{
@IsNotEmpty()
@IsString()
name:string


@IsEmail()
@IsNotEmpty()
@IsString()
email:string

@IsNotEmpty()
@IsNumber()
age:number

@IsNotEmpty()
@ValidateNested({each:true})
@Type(()=>Address)
address:Address
}
//validates all fields in the address
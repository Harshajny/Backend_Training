import { IsNotEmpty, IsString } from "class-validator";
import { StringLiteral } from "typescript";

export class createAddressDto {
  @IsNotEmpty()
  @IsString()
  line1: String;
  @IsNotEmpty()
  @IsString()
  pincode: string;
}

export class updateAddressDto{
    @IsString()
    line1: String;
    @IsString()
    pincode: string;
}
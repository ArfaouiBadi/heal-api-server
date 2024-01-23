import { IsNotEmpty, IsString } from 'class-validator';

export class addProductDto {
  @IsNotEmpty()
  ProductName: string;

  @IsString()
  @IsNotEmpty()
  ProductCategory: string;

  @IsString()
  address: string;

  @IsString()
  phone: string;
}

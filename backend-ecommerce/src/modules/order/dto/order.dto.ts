import { ApiProperty } from "@nestjs/swagger";

export class OrderDTO {
    @ApiProperty()
    productID: number;
  
    @ApiProperty()
    quantity: number;
  }
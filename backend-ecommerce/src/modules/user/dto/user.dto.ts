import { ApiProperty } from "@nestjs/swagger";

export class UserDTO {
    @ApiProperty({
      required: false,
    })
    userID: number;
  
    @ApiProperty()
    username: string;
  
    @ApiProperty()
    password: string;
  }

  export class ProfileDTO {
    @ApiProperty()
    username: string;
  }
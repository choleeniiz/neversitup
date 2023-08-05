import { ApiProperty } from '@nestjs/swagger';
import { UserDTO } from 'src/modules/user/dto/user.dto';

export class RegisterDTO {
    @ApiProperty()
    username: string;

    @ApiProperty()
    password: string;
}

export class LoginDTO {
    @ApiProperty()
    username: string

    @ApiProperty()
    password: string
}


export class RegisterResponseDTO {
    @ApiProperty()
    message: string
}


export class LoginResponseDTO {
    @ApiProperty()
    accessToken: string

    @ApiProperty()
    user: UserDTO
}
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateShortLinkDto {
  @IsString()
  @IsUrl()
  @IsNotEmpty()
  originalUrl!: string;
}

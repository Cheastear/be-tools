import { IsNotEmpty, IsString } from 'class-validator';

export class GetShortLinkDto {
  @IsString()
  @IsNotEmpty()
  code!: string;
}

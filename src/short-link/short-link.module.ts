import { Module } from '@nestjs/common';
import { ShortLinkService } from './short-link.service';
import { ShortLinkController } from './short-link.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShortLink } from './entity/short-link.entity';
import { CleanupService } from './cleanup.service';

@Module({
  imports: [TypeOrmModule.forFeature([ShortLink])],
  controllers: [ShortLinkController],
  providers: [ShortLinkService, CleanupService],
})
export class ShortLinkModule {}

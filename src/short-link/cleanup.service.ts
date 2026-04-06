import { Injectable } from '@nestjs/common';
import * as cron from 'node-cron';
import { ShortLinkService } from './short-link.service';

@Injectable()
export class CleanupService {
  constructor(private readonly shortLinkService: ShortLinkService) {
    // run every day at 2:00 AM
    cron.schedule('52 21 * * *', () => {
      void this.shortLinkService.deleteExpiredLinks();
    });
  }
}

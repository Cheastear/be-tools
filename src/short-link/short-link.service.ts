import {
  GoneException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateShortLinkDto } from './dto/create-short-link.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ShortLink } from './entity/short-link.entity';
import { LessThan, Repository } from 'typeorm';
import { nanoid } from 'nanoid';

@Injectable()
export class ShortLinkService {
  constructor(
    @InjectRepository(ShortLink)
    private readonly repo: Repository<ShortLink>,
  ) {}

  async create({ originalUrl }: CreateShortLinkDto): Promise<ShortLink> {
    let code: string;
    let exists: ShortLink | null;

    do {
      code = nanoid(6);
      exists = await this.repo.findOne({ where: { code } });
    } while (exists);

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    return await this.repo.save({ originalUrl, code, expiresAt });
  }

  async getLink(link: Partial<ShortLink>): Promise<ShortLink> {
    const repoLink = await this.repo.findOneBy(link);

    if (!repoLink) throw new NotFoundException('Link does not exist');

    if (new Date() > repoLink.expiresAt)
      throw new GoneException('Link expired');

    return repoLink;
  }

  async incrementClicks(link: Partial<ShortLink>) {
    const repoLink = await this.getLink(link);

    repoLink.clicks += 1;

    return await this.repo.save(repoLink);
  }

  async deleteLink(link: Partial<ShortLink>) {
    return await this.repo.delete(link);
  }

  async deleteExpiredLinks() {
    const result = await this.repo.delete({
      expiresAt: LessThan(new Date()),
    });

    Logger.log(`Deleted ${result.affected} expired links`);
  }
}

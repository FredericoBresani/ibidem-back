import { Module } from '@nestjs/common';
import { IbidemConfigService } from './services/config.service';

@Module({
  providers: [IbidemConfigService],
  exports: [IbidemConfigService],
})
export class SharedModule {}

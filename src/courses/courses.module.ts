import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { UserModule } from 'src/user/user.module';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';

@Module({
  imports: [DatabaseModule, UserModule],
  controllers: [CoursesController],
  exports: [],
  providers: [CoursesService],
})
export class CoursesModule {}

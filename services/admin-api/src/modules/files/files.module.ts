import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { File } from './entities/file.entity';
import { FileCreatedListener } from './listeners/file-created.listener';
import { AdminFilesController } from './admin-files.controller';
import { FilesService } from './files.service';

import { CategoriesModule } from '../categories/categories.module';

@Module({
  imports: [TypeOrmModule.forFeature([File]), CategoriesModule],
  controllers: [AdminFilesController],
  providers: [FilesService, JwtService, FileCreatedListener],
  exports: [FilesService]
})
export class FilesModule {}

import { File } from '../entities/file.entity';

export class FileCreatedEvent {
  files: Array<Express.Multer.File>;
  fileInfos: File[];
}

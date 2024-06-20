import { z } from 'zod';

import { MAX_FILE_SIZE_IN_BYTES, MAX_FILES_TO_UPLOAD, VALID_ALL_MIME_TYPES } from '../constants/files.constant';

export const uploadValidator = z.object({
  files: z
    .custom<FileList>()
    .refine(files => Array.from(files).length > 0, 'Image is required')
    .refine(
      files => Array.from(files).length <= MAX_FILES_TO_UPLOAD,
      files => {
        const arr = Array.from(files).map(x => x.name);

        arr.splice(0, MAX_FILES_TO_UPLOAD);

        return { message: `${arr.join('<br>')}` };
      }
    )
    .refine(
      files => Array.from(files).every(file => file.size <= MAX_FILE_SIZE_IN_BYTES),
      files => {
        const arr = Array.from(files).map(x => x.name);

        return {
          message: `${arr.join('<br>')} size ${arr.length > 1 ? 'are' : 'is'} not valid`
        };
      }
    )
    .refine(
      files => Array.from(files).every(file => VALID_ALL_MIME_TYPES.includes(file.type)),
      files => {
        const arr = Array.from(files).map(x => x.name);

        return {
          message: `${arr.join('<br>')} ${arr.length > 1 ? 'are' : 'is'} not supported`
        };
      }
    )
});

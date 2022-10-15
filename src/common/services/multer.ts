import multer from 'multer';
import { BadRequestException } from '@nestjs/common';

const ALLOWED_FORMAT = [
  'image/jpeg',
  'image/png',
  'image/jpg',
  'image/svg+xml',
];

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    if (ALLOWED_FORMAT.includes(file.mimetype)) {
      cb(null, true);
    } else {
      console.log('error');
      throw new BadRequestException({ message: 'Not supported file format' });
    }
  },
});

export default upload;

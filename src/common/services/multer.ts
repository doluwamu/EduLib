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
  limits: { fieldNameSize: 10, fileSize: 0.0001 },
  fileFilter: function (req, file, cb) {
    if (ALLOWED_FORMAT.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});

export default upload;

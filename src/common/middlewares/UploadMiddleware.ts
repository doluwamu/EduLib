import { NestMiddleware, InternalServerErrorException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import upload from '../services/multer';

export class SingleUploadCtrl implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const singleUpload = upload.single('photo');

    singleUpload(req, res, (error) => {
      if (error) {
        throw new InternalServerErrorException(error);
      }

      next();
    });
  }
}

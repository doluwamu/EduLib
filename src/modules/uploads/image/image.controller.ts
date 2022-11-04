import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Request,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageService } from './image.service';
import { Request as Req } from 'express';

@Controller('api/v1/uploads')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  // Request: /api/v1/uploads
  // type: POST
  // Desc: Endpoint to upload book image to cloudinary server
  @Post('')
  @UseInterceptors(FileInterceptor('photo'))
  async uploadImg(@Request() req: Req) {
    const uploadData = await this.imageService.uploadImage(req.file);
    return uploadData;
  }
}

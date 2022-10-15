import { Module } from '@nestjs/common';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';
import { MongooseModule } from '@nestjs/mongoose';
import { imageSchema } from './image.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Image', schema: imageSchema }]),
  ],
  controllers: [ImageController],
  providers: [ImageService],
})
export class ImageModule {}

import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';
import { MongooseModule } from '@nestjs/mongoose';
import { imageSchema } from './image.model';
import { SingleUploadCtrl } from '../../../common/middlewares/UploadMiddleware';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Image', schema: imageSchema }]),
  ],
  controllers: [ImageController],
  providers: [ImageService],
})
export class ImageModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SingleUploadCtrl)
      .forRoutes({ path: '/api/v1/uploads', method: RequestMethod.POST });
  }
}

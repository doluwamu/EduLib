import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { SingleUploadCtrl } from './common/middlewares/UploadMiddleware';
import { ImageModule } from './modules/uploads/image/image.module';

@Module({
  imports: [
    ImageModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DB_URI),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
// implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(SingleUploadCtrl)
//       .forRoutes({ path: '/api/v1/uploads', method: RequestMethod.POST });
//   }
// }

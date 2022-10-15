import { BooksService } from './books.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { bookSchema } from './book.model';
import { BooksController } from './books.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Book', schema: bookSchema }])],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}

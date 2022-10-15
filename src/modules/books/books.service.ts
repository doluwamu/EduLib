import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { getErrorMsg } from 'src/common/helpers/errorExceptions';
import { Book, BookDetails } from './book.model';

@Injectable()
export class BooksService {
  constructor(@InjectModel('Book') private readonly bookModel: Model<Book>) {}

  createBook = async (bookDetails: BookDetails) => {
    const book = new this.bookModel({
      name: bookDetails.name,
      image: bookDetails.image,
      author: bookDetails.author,
      intendedReaders: bookDetails.intendedReaders,
    });

    try {
      await book.save();
      return { message: 'Book successfully created!' };
    } catch (error) {
      getErrorMsg(error);
    }
  };

  listBooks = async () => {
    try {
      const books = await this.bookModel.find({}).populate('image').exec();
      return [...books];
    } catch (error) {
      getErrorMsg(error);
    }
  };

  getBookById = async (bookId: string) => {
    try {
      const book = await this.bookModel.findById(bookId).exec();

      if (!book) throw new NotFoundException('Book not found');

      return book;
    } catch (error) {
      getErrorMsg(error);
    }
  };

  //   bookInfo = (bookDetails: BookDetails) => {
  //     return{name: bookDetails.name,
  //     image: bookDetails.image,
  //     author: bookDetails.author,
  //     intendedReaders: bookDetails.intendedReaders
  //     }
  //   }
}

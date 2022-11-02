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

  editBookData = async (bookId: string, bookDetails: BookDetails) => {
    const book = await this.getBookData(bookId);

    if (!book) throw new NotFoundException('Book not found');

    book.name = bookDetails.name ? bookDetails.name : book.name;
    book.image = bookDetails.image ? bookDetails.image : book.image;
    book.author = bookDetails.author ? bookDetails.author : book.author;
    book.intendedReaders = bookDetails.intendedReaders
      ? bookDetails.intendedReaders
      : book.intendedReaders;

    await book.save();

    return { id: bookId, message: 'Successfully updated book!' };
  };

  removeBook = async (bookId: string) => {
    try {
      const book = await this.getBookData(bookId);

      if (!book) throw new NotFoundException('Book not found');

      await book.remove();
      return { message: 'book deleted successfully!' };
    } catch (error) {
      getErrorMsg(error);
    }
  };

  getBookData = async (bookId: string) => {
    try {
      const book = await this.bookModel.findById(bookId).exec();
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

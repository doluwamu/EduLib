import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { getErrorMsg } from 'src/common/helpers/errorExceptions';
import { Book, BookDetails } from './book.model';

@Injectable()
export class BooksService {
  constructor(@InjectModel('Book') private readonly bookModel: Model<Book>) {}

  // DESC: Service for adding book
  // target folder: /books.controller
  // target request: POST /api/v1/books
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

  // DESC: Service for get all books from DB
  // target folder: /books.controller
  // target request: GET /api/v1/books
  listBooks = async () => {
    try {
      const books = await this.bookModel.find({}).populate('image').exec();
      return [...books];
    } catch (error) {
      getErrorMsg(error);
    }
  };

  // DESC: Service for get a book by specified id
  // target folder: /books.controller
  // target request: GET /api/v1/books/:id
  getBookById = async (bookId: string) => {
    try {
      const book = await this.bookModel.findById(bookId).exec();

      if (!book) throw new NotFoundException('Book not found');

      return book;
    } catch (error) {
      getErrorMsg(error);
    }
  };

  // DESC: Service for update a book
  // target folder: /books.controller
  // target request: PUT /api/v1/books/:id
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

  // DESC: Service for delete a book
  // target folder: /books.controller
  // target request: DELETE /api/v1/books/:id
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

  // DESC: helper method for getting book by specified id string
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

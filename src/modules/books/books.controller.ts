import {
  Controller,
  Post,
  Request,
  NotFoundException,
  Param,
  Get,
  Put,
  Delete,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { Request as Req } from 'express';
import { BookDetails } from './book.model';

@Controller('api/v1/books')
export class BooksController {
  constructor(private readonly bookService: BooksService) {}

  // Request: /api/v1/books
  // type: POST
  // Desc: Endpoint to add a new book
  @Post()
  async addBook(@Request() req: Req) {
    const { image, name, author, intendedReaders }: BookDetails = req.body;

    if (!name || !intendedReaders) {
      throw new NotFoundException(
        `${!name ? 'name' : 'intendedReaders'} is a required field`,
      );
    }

    const bookInfo = { image, name, author, intendedReaders };

    const bookCreationData = await this.bookService.createBook(bookInfo);
    return bookCreationData;
  }

  // Request: /api/v1/books
  // type: GET
  // Desc: Endpoint to get all books from the database
  @Get()
  async getBooks() {
    const books = await this.bookService.listBooks();
    return books;
  }

  // Request: /api/v1/books/:id
  // type: GET
  // Desc: Endpoint to get a book by specified id in param
  @Get(':id')
  async getBook(@Param('id') bookId: string) {
    const bookDetails = await this.bookService.getBookById(bookId);
    return bookDetails;
  }

  // Request: /api/v1/books/:id
  // type: PUT
  // Desc: Endpoint to update a book in the DB
  @Put(':id')
  async updateBookData(@Param('id') bookId: string, @Request() req: Req) {
    const { image, name, author, intendedReaders }: BookDetails = req.body;

    console.log(name);
    const bookInfo = { image, name, author, intendedReaders };

    const editMsg = await this.bookService.editBookData(bookId, bookInfo);
    return editMsg;
  }

  // Request: /api/v1/books/:id
  // type: DELETE
  // Desc: Endpoint to delete book from DB
  @Delete(':id')
  async deleteBook(@Param('id') bookId: string) {
    const bookDeleteMsg = await this.bookService.removeBook(bookId);
    return bookDeleteMsg;
  }
}

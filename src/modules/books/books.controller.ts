import {
  Controller,
  Post,
  Request,
  NotFoundException,
  Param,
  Get,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { Request as Req } from 'express';
import { BookDetails } from './book.model';

@Controller('api/v1/books')
export class BooksController {
  constructor(private readonly bookService: BooksService) {}

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

  @Get()
  async getBooks() {
    const books = await this.bookService.listBooks();
    return books;
  }

  @Get(':id')
  async getBook(@Param('id') bookId: string) {
    const bookDetails = await this.bookService.getBookById(bookId);
    return bookDetails;
  }
}

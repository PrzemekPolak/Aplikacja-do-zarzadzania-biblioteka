import {beforeEach, describe, expect, test} from '@jest/globals';
import {BookBuilder} from "../Builder/BookBuilder";
import {System} from "../TestUtils/System";
import {Author} from "../../Domain/Author";
import {BookIdentity} from "../../Domain/BookIdentity";
import {BorrowingBuilder} from "../Builder/BorrowingBuilder";
import {NotFoundException} from "../../Exception/NotFoundException";
import {BorrowingIdentity} from "../../Domain/BorrowingIdentity";
import {ExampleRequest} from "../Builder/ExampleRequest";
import {DbTable} from "../../db.model";
import {GetBooksListRequestBuilder} from "../Builder/GetBooksListRequestBuilder";
import {AddOrUpdateBookRequestBuilder} from "../Builder/AddOrUpdateBookRequestBuilder";

describe('Book list sql test', () => {
  const book = BookBuilder.default().build();
  const bookIdentity = BookIdentity.generate();

  beforeEach(() => {
    System.clearDb();
  });

  test('Add book test', () => {
    const result = System.receivesRequest(ExampleRequest.addBook(AddOrUpdateBookRequestBuilder.default().build()));

    expect(result['state']['success']).toBe(true);
  });

  test('Update book', () => {
    const newTitle = 'Book title for update test';

    System.hasBook(BookBuilder.default().withIdentity(bookIdentity).withTitle('Some other title').build());

    const result = System.receivesRequest(ExampleRequest.updateBook(AddOrUpdateBookRequestBuilder.default().withIdentity(bookIdentity).withTitle(newTitle).build()));

    expect(result['state']['success']).toBe(true);
    expect(System.getBookBy(bookIdentity).title).toBe(newTitle);
  });

  test('User can get correct book by Id', () => {
    System.hasBook(book);

    const result = System.receivesRequest(ExampleRequest.getBook(book.identity));

    expect(result.id).toBe(book.identity.getValue());
    expect(result.title).toBe(book.title);
  });

  test('Delete book by Id', () => {
    System.hasBook(book);

    let result = System.receivesRequest(ExampleRequest.deleteRecord(book.identity.getValue(), DbTable.Book));

    expect(result['state']['success']).toBe(true);
    expect(() => System.getBookBy(book.identity)).toThrow(NotFoundException);
  });

  test('Related borrowing is deleted together with book', () => {
    const bookIdentity = BookIdentity.generate();
    const borrowingIdentity = BorrowingIdentity.generate();

    System.hasBook(BookBuilder.default().withIdentity(bookIdentity).build());
    System.hasBorrowing(BorrowingBuilder.default().withIdentity(borrowingIdentity).withBookIdentity(bookIdentity).build());

    System.receivesRequest(ExampleRequest.deleteRecord(bookIdentity.getValue(), DbTable.Book));

    expect(() => System.getBorrowingBy(borrowingIdentity)).toThrow(NotFoundException);
  });

  test('Get books list test', () => {
    System.hasBook(book);

    const result = System.receivesRequest(ExampleRequest.getBooksList(GetBooksListRequestBuilder.default().build()));

    expect(result['listData'].length).toBe(1);
    expect(result['listData'][0].id).toBe(book.identity.getValue());
    expect(result['fullLength']).toBe(1);
  });

  test('Search in list can return book with specified title', () => {
    let title = 'Book title for test';
    let book = BookBuilder.default().withTitle(title).build();

    System.hasBook(book);

    const result = System.receivesRequest(ExampleRequest.getBooksList(GetBooksListRequestBuilder.default().withSearchPhrase(title).build()));

    expect(result['listData'][0].title).toBe(title);
  });

  test('Search in list returns no records when search value has no match', () => {
    const searchPhraseWithoutMatch = 'dfsdfdshjhghgj';

    System.hasBook(BookBuilder.default().build());

    const result = System.receivesRequest(ExampleRequest.getBooksList(GetBooksListRequestBuilder.default().withSearchPhrase(searchPhraseWithoutMatch).build()));

    expect(result['fullLength']).toBe(0);
  });

  test('Search in list returns matched records regardless of column', () => {
    const searchValue = 'search'

    System.hasBook(BookBuilder.default().withTitle(searchValue + 'title').build());
    System.hasBook(BookBuilder.default().withAuthor(Author.fromString(searchValue + 'surname')).build());

    const result = System.receivesRequest(ExampleRequest.getBooksList(GetBooksListRequestBuilder.default().withSearchPhrase(searchValue).build()));

    expect(result['fullLength']).toBe(2);
  });

  test('It returns borrowed book when there is matching search text and borrowedOnly is false', () => {
    const search = 'search phrase'
    const book = BookBuilder.default().withTitle(search).build();

    System.hasBook(book);
    System.hasBorrowing(BorrowingBuilder.default().withBookIdentity(book.identity).build());

    const result = System.receivesRequest(ExampleRequest.getBooksList(
      GetBooksListRequestBuilder.default().unBorrowedOnly().withSearchPhrase(search).build()
    ));

    expect(result['fullLength']).toBe(1);
  });

  test('Not borrowed book is not returned in list when there is matching search text and borrowedOnly is true', () => {
    const search = 'search phrase'
    const book = BookBuilder.default().withTitle(search).build();

    System.hasBook(book);

    const result = System.receivesRequest(ExampleRequest.getBooksList(
      GetBooksListRequestBuilder.default().borrowedOnly().withSearchPhrase(search).build()
    ));

    expect(result['fullLength']).toBe(0);
  });
});

interface BookMetadata {
  title: string;
  isbn: string;
  author: string;
}

type FullBook = BookMetadata & { availability: boolean; sales: number };

class Book {
  title: BookMetadata["title"];
  author: BookMetadata["author"];
  isbn: BookMetadata["isbn"];
  constructor(
    title: BookMetadata["title"],
    author: BookMetadata["author"],
    isbn: BookMetadata["isbn"]
  ) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

const books = new Map<BookMetadata["isbn"], Book>();

const createBook = (
  title: BookMetadata["title"],
  author: BookMetadata["author"],
  isbn: BookMetadata["isbn"]
): Book => {
  const existingBook = books.has(isbn);

  if (existingBook) return books.get(isbn)!;

  const book = new Book(title, author, isbn);
  books.set(isbn, book);

  return book;
};

const booksList: Array<FullBook> = [];

const addBook = (
  title: FullBook["title"],
  author: FullBook["author"],
  isbn: FullBook["isbn"],
  availability: FullBook["availability"],
  sales: FullBook["sales"]
) => {
  const book = {
    ...createBook(title, author, isbn),
    availability,
    sales,
  };

  booksList.push(book);
};

addBook("Harry Potter", "JK Rowling", "ABC123", true, 100);
addBook("Harry Potter", "JK Rowling", "ABC123", false, 90);
addBook("To kill a mockingbird", "Harper Lee", "DEF345", false, 65);
addBook("To kill a mockingbird", "Harper Lee", "DEF345", true, 100);
addBook("The great Gatsby", "F.Scott Fitzgerald", "GHI678", true, 95);

console.log({ books, booksList });

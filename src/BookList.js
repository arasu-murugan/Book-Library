import React, { useState } from "react";
import Book from "./book";
import "./sass/style.css";

const BookList = () => {
  const [books, setBooks] = useState([
    {
      id: 1,
      volumeInfo: {
        title: "Sample Book",
        authors: "John Doe",
        publisher: "ABC Publishers",
        previewLink: "https://books.google.co.in/",
        imageLinks: { thumbnail: "defaultBook.png" },
      },
    },
  ]);

  // Function to add a new book
  const addBook = (newBook) => {
    setBooks([...books, newBook]);
  };

  return (
    <div>
      <h1>Library</h1>
      <AddBookForm addBook={addBook} />
      <div className="book-list">
        {books.map((book) => (
          <Book key={book.id} id={book.id} volumeInfo={book.volumeInfo} />
        ))}
      </div>
    </div>
  );
};

export default BookList;

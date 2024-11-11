import React, { useState } from "react";

const AddBookForm = ({ onAddBook }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publisher, setPublisher] = useState("");
  const [imageLink, setImageLink] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Create a new book object
    const newBook = {
      id: Date.now(), // Generate a unique ID
      volumeInfo: {
        title: title || "Title not available",
        authors: author || "Author not available",
        publisher: publisher || "Publisher not available",
        imageLinks: {
          thumbnail: imageLink || "", // Optional image link
        },
      },
    };

    // Pass the new book to the parent component
    onAddBook(newBook);

    // Reset form fields
    setTitle("");
    setAuthor("");
    setPublisher("");
    setImageLink("");
  };

  return (
    <form onSubmit={handleSubmit} className="add-book-form">
      <h3>Add a New Book</h3>
      <label>Title</label>
      <input 
        type="text" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        placeholder="Book Title" 
      />

      <label>Author</label>
      <input 
        type="text" 
        value={author} 
        onChange={(e) => setAuthor(e.target.value)} 
        placeholder="Author Name" 
      />

      <label>Publisher</label>
      <input 
        type="text" 
        value={publisher} 
        onChange={(e) => setPublisher(e.target.value)} 
        placeholder="Publisher" 
      />

      <label>Image Link (Optional)</label>
      <input 
        type="text" 
        value={imageLink} 
        onChange={(e) => setImageLink(e.target.value)} 
        placeholder="Image URL" 
      />

      <button type="submit">Add Book</button>
    </form>
  );
};

export default AddBookForm;

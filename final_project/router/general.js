const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/', (req, res) => {
    res.json(JSON.stringify(books, null, 2));
});


// Get book details based on ISBN
public_users.get('/isbn/:isbn', (req, res) => {
    const book = books[req.params.isbn];
    book ? res.json(book) : res.status(404).json({ message: "Book not found" });
});

  
// Get book details based on author
public_users.get('/author/:author', (req, res) => {
    const result = Object.values(books).filter(book => book.author === req.params.author);
    result.length ? res.json(result) : res.status(404).json({ message: "No books found by this author" });
});


// Get all books based on title
public_users.get('/title/:title', (req, res) => {
    const result = Object.values(books).filter(book => book.title === req.params.title);
    result.length ? res.json(result) : res.status(404).json({ message: "No books found with this title" });
});


//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;

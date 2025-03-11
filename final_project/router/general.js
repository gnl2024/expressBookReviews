const express = require('express');
const axios = require('axios');

// ✅ Declare `public_users` first before using it
const public_users = express.Router();

let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;

// ✅ Now `public_users` is declared before use
public_users.get('/', async (req, res) => {
    try {
        // Simulate fetching books asynchronously
        const response = await axios.get('http://localhost:5001/books');
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: "Error fetching books", error: error.message });
    }
});

public_users.post("/register", (req,res) => {
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/', (req, res) => {
    res.json(JSON.stringify(books, null, 2));
});

// Get book details based on ISBN using Promises
public_users.get('/isbn/:isbn', (req, res) => {
    const isbn = req.params.isbn;

    new Promise((resolve, reject) => {
        const book = books[isbn];
        if (book) {
            resolve(book);
        } else {
            reject("Book not found");
        }
    })
    .then(book => res.json(book))
    .catch(error => res.status(404).json({ message: error }));
});

// Get book details based on author using Promises
public_users.get('/author/:author', (req, res) => {
    const author = req.params.author;

    new Promise((resolve, reject) => {
        const booksByAuthor = Object.values(books).filter(book => book.author === author);
        if (booksByAuthor.length) {
            resolve(booksByAuthor);
        } else {
            reject("No books found by this author");
        }
    })
    .then(books => res.json(books))
    .catch(error => res.status(404).json({ message: error }));
});

// Get all books based on title using Promises
public_users.get('/title/:title', (req, res) => {
    const title = req.params.title;

    new Promise((resolve, reject) => {
        const booksByTitle = Object.values(books).filter(book => book.title === title);
        if (booksByTitle.length) {
            resolve(booksByTitle);
        } else {
            reject("No books found with this title");
        }
    })
    .then(books => res.json(books))
    .catch(error => res.status(404).json({ message: error }));
});

// Get book review (Not implemented yet)
public_users.get('/review/:isbn', (req, res) => {
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;

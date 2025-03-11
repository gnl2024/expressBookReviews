const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
}

//only registered users can login
regd_users.post("/register", (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: "Username and password required" });

    if (users[username]) return res.status(409).json({ message: "Username already exists" });

    users[username] = { password };
    res.status(201).json({ message: "User registered successfully" });
});

regd_users.post("/login", (req, res) => {
    const { username, password } = req.body;
    if (users[username] && users[username].password === password) {
        req.session.user = username;
        res.json({ message: "Login successful", token: jwt.sign({ username }, "secret_key") });
    } else {
        res.status(401).json({ message: "Invalid username or password" });
    }
});


// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    if (!req.session.user) return res.status(401).json({ message: "Please log in" });

    const { review } = req.query;
    if (!review) return res.status(400).json({ message: "Review content is required" });

    if (!books[req.params.isbn].reviews) books[req.params.isbn].reviews = {};
    books[req.params.isbn].reviews[req.session.user] = review;

    res.json({ message: "Review added/updated successfully" });
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
    if (!req.session.user) return res.status(401).json({ message: "Please log in" });

    const bookReviews = books[req.params.isbn]?.reviews;
    if (bookReviews && bookReviews[req.session.user]) {
        delete bookReviews[req.session.user];
        res.json({ message: "Review deleted successfully" });
    } else {
        res.status(404).json({ message: "Review not found" });
    }
});


module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;

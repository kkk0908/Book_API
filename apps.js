const Joi = require("joi");
const express = require("express");
const authors = require("./entities/authors");
const books = require("./entities/books");
const app = express();
const winston = require("winston");
const logger = require("./utils/logger");
const authorsSchema=require('./validation/authorsValidation')
const booksSchema=require('./validation/booksValidation')
app.use(express.json());

app.route("/api/authors").get((req, res, next) => {
  authors
    .getAuthors()
    .then(result => res.send(result.rows))
    .catch(next)
  logger.info("Displayed Authors");
});

app.route("/api/authors").post((req, res, next) => {
  //const author={id:req.body.id,full_name:req.body.full_name,email:req.body.email,gender:req.body.gender,birth_date:req.body.birth_date}

  
  const result = Joi.validate(req.body, authorsSchema.authorPostSchema);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
  }
  authors
    .addAuthor(
      req.body.id,
      req.body.full_name,
      req.body.email,
      req.body.gender,
      req.body.dob
    )
    .then(result => res.send(result))
    //.catch(err => console.error("error during disconnection", err.stack))
    .catch(next);

  //.push(author)
  logger.info("added author");
});

app.route("/api/authors/:id").get((req, res, next) => {
  authors
    .getAuthorById(req.params.id)
    .then(result => {
      if(result.rows.length==0)
      {
        res.send("id not found")
      }
      res.send(result.rows)})
    .catch(next);
  logger.info("author got by id");
});

app.route("/api/authors").put((req, res, next) => {
  
  const result = Joi.validate(req.body, authorsSchema.authorPutSchema);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  authors
    .updateAuthor(req.body.full_name, req.body.id)
    .then(result => res.send(result))
    .catch(next)
  logger.info("update");
});

app.route("/api/authors/:id").delete((req, res, next) => {
  
  const result = Joi.validate(req.params, authorsSchema.authorDeleteSchema);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }
  authors
    .deleteAuthorById(req.params.id)
    .then(result => res.send(result))
    .catch(next);
  logger.info("delete");
});

/******************************* Books ******************************** */
app.route("/api/books").get((req, res, next) => {
  books
    .getBooks()
    .then(result => res.send(result.rows))
    .catch(next);
  logger.info("Displayed Books");
});

app.route("/api/books/:ISBN").get((req, res, next) => {
  books
    .getBookUsingId(req.params.ISBN)
    .then(result => {
      if(result.rows.length==0){
        res.status(404).send("id not found")
        return
      }
      res.send(result.rows)})
    .catch(next);
  logger.info("book by id");
});

app.route("/api/books").post((req, res) => {
  
  const result = Joi.validate(req.body, booksSchema.booksPostschema);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  books
    .addBook(
      req.body.title,
      req.body.isbn,
      req.body.author,
      req.body.author_id,
      req.body.publish_date
    )
    .then(result => {
      res.send(result).catch(next);
      logger.info("book add");
    });
});

app.route("/api/books").put((req, res, next) => {
  
  const result = Joi.validate(req.body, booksSchema.booksPutSchema);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  books
    .updateBook(req.body.title, req.body.ISBN)
    .then(result => res.send(result))
    .catch(next);
  logger.info("update book");
});
app.route("/api/books/:ISBN").delete((req, res, next) => {
  books
    .deleteBook(req.params.ISBN)
    .then(result =>{ 
      if(result.rowCount==0){
        res.status(404).send("Id not found")
        return
      }res.send(result)})
    .catch(next);
  logger.info("delete book");
});
//const port = process.env.PORT || 3000;

app.use(function(err, req, res, next) {
  res.status(500).send("some thing went wrong");
});

app.listen(4000, () => logger.info(`server running`));

import React, { Component } from "react";
import { Route } from "react-router-dom";

import MyBooks from "./MyBooks";
import SearchBooks from "./SearchBooks.js";
import BookDetails from "./BookDetails.js";

import * as BooksAPI from "./BooksAPI";
import "./App.css";

class BooksApp extends Component {
  state = {
    books: [],
    bookId: ""
  };

  componentDidMount() {
    BooksAPI.getAll().then(books =>
      this.setState({
        books: books
      })
    );
  }

  updateShelves = (book, shelf) => {
    BooksAPI.update(book, shelf)
      .then(() => BooksAPI.getAll())
      .then(books =>
        this.setState({
          books: books
        })
      );
  };

  updateShelves__BD = (book, shelf, id) => {
    BooksAPI.update(book, shelf)
      .then(() => BooksAPI.get(id))
      .then(data =>
        this.setState({
          book: data,
          bookId: id
        })
      )
      .then(() => this.updateShelves(book, shelf));
  };

  getBookId = id => {
    this.setState({ bookId: id });
  };

  render() {
    let bookId = this.state.bookId;
    let bookDetailPath = `/details/${this.state.bookId}`;

    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <MyBooks
              books={this.state.books}
              updateShelves={this.updateShelves}
              getBookId={this.getBookId}
            />
          )}
        />
        <Route
          path="/search"
          render={() => (
            <SearchBooks
              books={this.state.books}
              updateShelves={this.updateShelves}
              getBookId={this.getBookId}
            />
          )}
        />
        <Route
          path={bookDetailPath}
          render={() => (
            <BookDetails
              books={this.state.books}
              onUpdateShelves__BD={(book, shelf, id) =>
                this.updateShelves__BD(book, shelf, id)
              }
              bookId={bookId}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;

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
    currentlyReading: [],
    wantToRead: [],
    read: [],
    bookId: ""
  };

  // Get initial state (book array and 3 shelves arrays)
  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.updateShelfState(books);
    });
  }

  // Update books and shelves arrays when a books shelf changes
  updateShelfState(books) {
    this.setState({
      books: books,
      currentlyReading: books.filter(book => book.shelf === "currentlyReading"),
      wantToRead: books.filter(book => book.shelf === "wantToRead"),
      read: books.filter(book => book.shelf === "read")
    });
  }

  // When a book changes shelf from either MyBooks or SearchBook,
  // update the info in the server, get all the books again,
  // and update the state/view on either those two pages
  updateShelves = (book, shelf) => {
    BooksAPI.update(book, shelf)
      .then(() => BooksAPI.getAll())
      .then(books => this.updateShelfState(books));
  };

  // When a book changes shelf from BookDetails,
  // update the info in the server, get the single book changed,
  // and update the state in the single book page.
  // Then call updateShelves to update the other pages.
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

  // Get the id of the book selected (to open BookDetails)
  // in order to set the path
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
              currentlyReading={this.state.currentlyReading}
              wantToRead={this.state.wantToRead}
              read={this.state.read}
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

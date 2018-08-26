import React, { Component } from "react";
import { Route } from "react-router-dom";

import MyBooks from "./MyBooks";
import SearchBooks from "./SearchBooks.js";
import BookDetails from "./BookDetails.js";

import * as BooksAPI from "./BooksAPI";
import "./App.css";

class BooksApp extends Component {
  state = {
    currentlyReading: [],
    wantToRead: [],
    read: [],
    bookId: ""
  };

  // Get initial state (book array and 3 shelves arrays)
  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.updateStateShelf(books);
    });
  }

  // Update books and shelves arrays in the state when a books shelf changes
  updateStateShelf(books) {
    this.setState({
      //books: books,
      currentlyReading: books.filter(book => book.shelf === "currentlyReading"),
      wantToRead: books.filter(book => book.shelf === "wantToRead"),
      read: books.filter(book => book.shelf === "read")
    });
  }

  // When a book changes shelf from either MyBooks, SearchBook, or BookDetails,
  // update the info in the server, get all the books again,
  // and call updateStateShelf to update the data in the App state as well
  updateRemoteShelves = (book, shelf) => {
    BooksAPI.update(book, shelf)
      .then(() => BooksAPI.getAll())
      .then(books => this.updateStateShelf(books));
  };

  // Get the id of the book selected (to open BookDetails)
  // in order to set the path
  getBookId = id => {
    this.setState({ bookId: id });
  };

  handleData = data => {
    return data ? (Array.isArray(data) ? this.handleArrays(data) : data) : null;
  };

  // handle book data with the array type
  handleArrays(data) {
    return !data ? "" : data.length > 0 ? data.join(", ") : "";
  }

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
              currentlyReading={this.state.currentlyReading}
              wantToRead={this.state.wantToRead}
              read={this.state.read}
              updateRemoteShelves={this.updateRemoteShelves}
              getBookId={this.getBookId}
              handleData={this.handleData}
            />
          )}
        />
        <Route
          path="/search"
          render={() => (
            <SearchBooks
              updateRemoteShelves={this.updateRemoteShelves}
              getBookId={this.getBookId}
              handleData={this.handleData}
            />
          )}
        />
        <Route
          path={bookDetailPath}
          render={() => (
            <BookDetails
              onUpdateRemoteShelves={(book, shelf) =>
                this.updateRemoteShelves(book, shelf)
              }
              bookId={bookId}
              handleData={this.handleData}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;

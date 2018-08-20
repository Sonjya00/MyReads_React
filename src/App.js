import React, { Component } from "react";
import { Route } from "react-router-dom";

import MyBooks from "./MyBooks";
import SearchBooks from "./SearchBooks.js";

import * as BooksAPI from "./BooksAPI";
import "./App.css";

class BooksApp extends Component {
  state = {
    books: []
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

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <MyBooks
              books={this.state.books}
              updateShelves={this.updateShelves}
            />
          )}
        />
        />
        <Route
          path="/search"
          render={() => (
            <SearchBooks
              books={this.state.books}
              updateShelves={this.updateShelves}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;

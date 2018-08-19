import React from "react";

import { Route } from "react-router-dom";

import MyBooks from "./MyBooks";
import SearchBooks from "./SearchBooks.js";

import * as BooksAPI from "./BooksAPI";
import "./App.css";

class BooksApp extends React.Component {
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

  render() {
    console.log(this.state.books);
    return (
      <div className="app">
        <Route exact path="/" render={() => <MyBooks />} />
        <Route
          path="/search"
          render={() => <SearchBooks books={this.state.books} />}
        />
      </div>
    );
  }
}

export default BooksApp;

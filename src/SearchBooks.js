import React, { Component } from "react";
import { Link } from "react-router-dom";
import escapeRegExp from "escape-string-regexp";
import sortBy from "sort-by";
import * as BooksAPI from "./BooksAPI";
import Book from "./Book.js";

class SearchBooks extends Component {
  state = {
    query: "",
    showingBooks: []
  };

  updateQuery = query => {
    this.setState({
      query: query
    });
    this.searchBooks(query);
  };

  searchBooks = query => {
    BooksAPI.search(query).then(data => {
      if (data && data.length > 0) {
        this.setState({
          showingBooks: data
        });
      } else {
        this.setState({
          showingBooks: []
        });
      }
    });
  };

  render() {
    const { updateShelves } = this.props;
    const { query, showingBooks } = this.state;

    // let showingBooks;
    // if (query) {
    //   const match = new RegExp(escapeRegExp(query), "i");
    //   showingBooks = books.filter(book => match.test(book.title));
    // } else {
    //   showingBooks = books;
    // }

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            {/*
                NOTES: The search from BooksAPI is limited to a particular set of search terms.
                You can find these search terms here:
                https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                you don't find a specific author or title. Every search is limited by search terms.
              */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={event => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          {showingBooks.length > 0 && (
            <div>Showing {showingBooks.length} books</div>
          )}
          <ol className="books-grid">
            {showingBooks &&
              showingBooks.map(book => (
                <Book
                  key={book.id}
                  onUpdateShelves={(book, shelf) => updateShelves(book, shelf)}
                  id={book.id}
                  shelf={book.shelf}
                  img={book.imageLinks ? book.imageLinks.smallThumbnail : ""}
                  title={book.title}
                  author={book.authors}
                />
              ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBooks;

import React, { Component } from "react";
import { Link } from "react-router-dom";
import Book from "./Book.js";
import BookDetails from "./BookDetails.js";

class MyBooks extends Component {
  // When BookDetails is open from Book,
  // Book sends the id of the book selected to the parent component,
  // which then sends it to App (needed to get the path to BookDetails)
  sendBookId = id => {
    this.props.getBookId(id);
  };
  render() {
    const { books, updateShelves } = this.props;
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {/* CURRENTLY READING BOOKS */}
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {books
                    .filter(book => book.shelf === "currentlyReading")
                    .map(book => {
                      return (
                        <Book
                          key={book.id}
                          onUpdateShelves={(book, shelf) =>
                            updateShelves(book, shelf)
                          }
                          sendBookId={this.sendBookId}
                          id={book.id}
                          shelf={book.shelf}
                          img={
                            book.imageLinks
                              ? book.imageLinks.smallThumbnail
                              : ""
                          }
                          title={book.title}
                          author={book.authors}
                        />
                      );
                    })}
                </ol>
              </div>
            </div>
            {/* WANT TO READ BOOKS */}
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {books
                    .filter(book => book.shelf === "wantToRead")
                    .map(book => {
                      return (
                        <Book
                          key={book.id}
                          onUpdateShelves={(book, shelf) =>
                            updateShelves(book, shelf)
                          }
                          sendBookId={this.sendBookId}
                          id={book.id}
                          shelf={book.shelf}
                          img={
                            book.imageLinks
                              ? book.imageLinks.smallThumbnail
                              : ""
                          }
                          title={book.title}
                          author={book.authors}
                        />
                      );
                    })}
                </ol>
              </div>
            </div>
            {/* READ BOOKS */}
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {books.filter(book => book.shelf === "read").map(book => {
                    return (
                      <Book
                        key={book.id}
                        onUpdateShelves={(book, shelf) =>
                          updateShelves(book, shelf)
                        }
                        sendBookId={this.sendBookId}
                        id={book.id}
                        shelf={book.shelf}
                        img={
                          book.imageLinks ? book.imageLinks.smallThumbnail : ""
                        }
                        title={book.title}
                        author={book.authors}
                      />
                    );
                  })}
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}

export default MyBooks;

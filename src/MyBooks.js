import React, { Component } from "react";
import { Link } from "react-router-dom";
import Book from "./Book.js";

class MyBooks extends Component {
  render() {
    const {
      currentlyReading,
      wantToRead,
      read,
      updateRemoteShelves
    } = this.props;
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {/* CURRENTLY READING BOOKS */}
            <div className="bookshelf">
              <h2 className="bookshelf-title">
                Currently Reading ({currentlyReading.length})
              </h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {currentlyReading.map(book => {
                    const { id, shelf, imageLinks, title, authors } = book;
                    return (
                      <Book
                        key={id}
                        id={id}
                        shelf={shelf}
                        img={imageLinks ? imageLinks.smallThumbnail : ""}
                        title={title}
                        authors={authors}
                        onUpdateRemoteShelves={(book, shelf) =>
                          updateRemoteShelves(book, shelf)
                        }
                        // When BookDetails is open from Book,
                        // Book sends the id of the book selected to the parent component,
                        // which then sends it to App (needed to get the path to BookDetails)
                        onSendBookId={id => {
                          this.props.getBookId(id);
                        }}
                        handleArrays={this.props.handleArrays}
                      />
                    );
                  })}
                </ol>
              </div>
            </div>
            {/* WANT TO READ BOOKS */}
            <div className="bookshelf">
              <h2 className="bookshelf-title">
                Want to Read ({wantToRead.length})
              </h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {wantToRead.map(book => {
                    const { id, shelf, imageLinks, title, authors } = book;
                    return (
                      <Book
                        key={id}
                        id={id}
                        shelf={shelf}
                        img={imageLinks ? imageLinks.smallThumbnail : ""}
                        title={title}
                        authors={authors}
                        onUpdateRemoteShelves={(book, shelf) =>
                          updateRemoteShelves(book, shelf)
                        }
                        onSendBookId={id => {
                          this.props.getBookId(id);
                        }}
                        handleArrays={this.props.handleArrays}
                      />
                    );
                  })}
                </ol>
              </div>
            </div>
            {/* READ BOOKS */}
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read ({read.length})</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {read.map(book => {
                    const { id, shelf, imageLinks, title, authors } = book;
                    return (
                      <Book
                        key={id}
                        id={id}
                        shelf={shelf}
                        img={imageLinks ? imageLinks.smallThumbnail : ""}
                        title={title}
                        authors={authors}
                        onUpdateRemoteShelves={(book, shelf) =>
                          updateRemoteShelves(book, shelf)
                        }
                        onSendBookId={id => {
                          this.props.getBookId(id);
                        }}
                        handleArrays={this.props.handleArrays}
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

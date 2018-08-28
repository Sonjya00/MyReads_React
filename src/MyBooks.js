import React, { Component } from "react";
import { Link } from "react-router-dom";
import Book from "./Book";

class MyBooks extends Component {
  clearShelf = shelf =>
    shelf.map(book => this.props.updateRemoteShelves(book, "none"));
  render() {
    const {
      currentlyReading,
      wantToRead,
      read,
      updateRemoteShelves,
      handleData
    } = this.props;
    return (
      <div className="list-books">
        <div className="list-books__title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books__content">
          <div>
            {/* CURRENTLY READING BOOKS */}
            <div className="bookshelf">
              <h2 className="bookshelf__title heading--secondary">
                Currently Reading ({currentlyReading.length})
              </h2>
              {currentlyReading.length === 0 ? (
                <p class="no-books-message">
                  There are no books on this shelf. Add some from the{" "}
                  <Link className="link" to="/search">
                    Search Page
                  </Link>
                </p>
              ) : (
                <div className="bookshelf__books">
                  <button
                    className="reset-query-btn"
                    onClick={() => this.clearShelf(currentlyReading)}
                  >
                    Clear this shelf
                  </button>
                  <ol className="books-grid--g">
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
                          handleData={handleData}
                        />
                      );
                    })}
                  </ol>
                </div>
              )}
            </div>
            {/* WANT TO READ BOOKS */}
            <div className="bookshelf">
              <h2 className="bookshelf__title heading--secondary">
                Want to Read ({wantToRead.length})
              </h2>
              {wantToRead.length === 0 ? (
                <p class="no-books-message">
                  There are no books on this shelf. Add some from the{" "}
                  <Link className="link" to="/search">
                    Search Page
                  </Link>
                </p>
              ) : (
                <div className="bookshelf__books">
                  <button
                    className="reset-query-btn"
                    onClick={() => this.clearShelf(currentlyReading)}
                  >
                    Clear this shelf
                  </button>
                  <ol className="books-grid--g">
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
                          handleData={handleData}
                        />
                      );
                    })}
                  </ol>
                </div>
              )}
            </div>
            {/* READ BOOKS */}
            <div className="bookshelf">
              <h2 className="bookshelf__title heading--secondary">
                Read ({read.length})
              </h2>
              {read.length === 0 ? (
                <p class="no-books-message">
                  There are no books on this shelf. Add some from the{" "}
                  <Link className="link" to="/search">
                    Search Page
                  </Link>
                </p>
              ) : (
                <div className="bookshelf__books">
                  <button
                    className="reset-query-btn"
                    onClick={() => this.clearShelf(currentlyReading)}
                  >
                    Clear this shelf
                  </button>
                  <ol className="books-grid--g">
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
                          handleData={handleData}
                        />
                      );
                    })}
                  </ol>
                </div>
              )}
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

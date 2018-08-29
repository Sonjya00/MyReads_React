import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Book from "./Book";

class MyBooks extends Component {
  clearShelf = shelf =>
    shelf.map(book => this.props.updateRemoteShelves(book, "none"));
  render() {
    const {
      currentlyReading,
      wantToRead,
      read,
      loadingShelves,
      updateRemoteShelves,
      handleData
    } = this.props;

    const LoadingMessage = (
      <div className="query-result--g">
        <p>Loading books on this shelf... </p>
      </div>
    );
    const NoBooksMessages = (
      <p className="no-books-message">
        There are no books on this shelf. Add some from the{" "}
        <Link className="link" to="/search">
          Search Page
        </Link>
      </p>
    );
    return (
      <div className="list-books">
        <div className="list-books__top-bar">
          <h1 className="list-books__title">
            <Link to="/">MyReads</Link>
          </h1>
        </div>
        <div className="list-books__content">
          <div>
            {/* CURRENTLY READING BOOKS */}
            <div className="bookshelf">
              <h2 className="bookshelf__title heading--secondary">
                Currently Reading ({currentlyReading.length})
              </h2>
              {loadingShelves === true ? (
                LoadingMessage
              ) : currentlyReading.length === 0 ? (
                NoBooksMessages
              ) : (
                <div className="bookshelf__books">
                  <button
                    className="reset-shelf-btn"
                    onClick={() => this.clearShelf(currentlyReading)}
                  >
                    Clear this shelf
                  </button>
                  <ol className="books-grid--g">
                    {currentlyReading.map(book => {
                      const { id, imageLinks, title, authors } = book;
                      return (
                        <Book
                          key={id}
                          id={id}
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
              {loadingShelves === true ? (
                LoadingMessage
              ) : wantToRead.length === 0 ? (
                NoBooksMessages
              ) : (
                <div className="bookshelf__books">
                  <button
                    className="reset-shelf-btn"
                    onClick={() => this.clearShelf(wantToRead)}
                  >
                    Clear this shelf
                  </button>
                  <ol className="books-grid--g">
                    {wantToRead.map(book => {
                      const { id, imageLinks, title, authors } = book;
                      return (
                        <Book
                          key={id}
                          id={id}
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
              {loadingShelves === true ? (
                LoadingMessage
              ) : read.length === 0 ? (
                NoBooksMessages
              ) : (
                <div className="bookshelf__books">
                  <button
                    className="reset-shelf-btn"
                    onClick={() => this.clearShelf(read)}
                  >
                    Clear this shelf
                  </button>
                  <ol className="books-grid--g">
                    {read.map(book => {
                      const { id, imageLinks, title, authors } = book;
                      return (
                        <Book
                          key={id}
                          id={id}
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
          <Link to="/search" role="button" aria-label="Add a book">
            Add a book
          </Link>
        </div>
      </div>
    );
  }
}

MyBooks.propTypes = {
  currentlyReading: PropTypes.array,
  wantToRead: PropTypes.array,
  read: PropTypes.array,
  loadingShelves: PropTypes.bool,
  updateRemoteShelves: PropTypes.func,
  handleData: PropTypes.func
};

export default MyBooks;

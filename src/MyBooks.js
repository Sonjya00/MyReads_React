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
              <h2 className="bookshelf__title">
                Currently Reading ({currentlyReading.length})
              </h2>
              {currentlyReading.length === 0 ? (
                <p>
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
                          // When BookDetails is open from Book,
                          // Book sends the id of the book selected to the parent component,
                          // which then sends it to App (needed to get the path to BookDetails)
                          // onSendBookId={id => getBookId(id)}
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
              <h2 className="bookshelf__title">
                Want to Read ({wantToRead.length})
              </h2>
              <div className="bookshelf__books">
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
                        // onSendBookId={id => getBookId(id)}
                        handleData={handleData}
                      />
                    );
                  })}
                </ol>
              </div>
            </div>
            {/* READ BOOKS */}
            <div className="bookshelf">
              <h2 className="bookshelf__title">Read ({read.length})</h2>
              <div className="bookshelf__books">
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
                        // onSendBookId={id => getBookId(id)}
                        handleData={handleData}
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

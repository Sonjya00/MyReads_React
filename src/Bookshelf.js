import React, { Component } from "react";
import Book from "./Book.js";
import { notEqual } from "assert";
class Bookshelf extends Component {
  render() {
    const {
      currentlyReading,
      wantToRead,
      read,
      updateRemoteShelves
    } = this.props;
    return (
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
                onUpdateRemoteShelves={this.props.onUpdateRemoteShelves(
                  uno,
                  due
                )}
                onSendBookId={id => {
                  this.props.getBookId(id);
                }}
                handleArrays={this.props.handleArrays}
              />
            );
          })}
        </ol>
      </div>
    );
  }
}

export default Bookshelf;

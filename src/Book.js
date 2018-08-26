import React, { Component } from "react";
import { Link } from "react-router-dom";

class Book extends Component {
  // When the book changes shelf,
  // call onUpdateRemoteShelves on either MyBooks or SearchBooks and send the new data
  handleChangeShelf = event => {
    this.props.onUpdateRemoteShelves(this.props, event.target.value);
  };

  // Upon opening BookDetails, send the book id to MyBooks or SearchBooks,
  // which will then send it to App.
  // Then store the id to the localStorage (or Bookdetails will lose this data
  // upon refresh).
  handleClick = id => {
    id = this.props.id;
    this.props.onSendBookId(id);
    localStorage.setItem("bookId", JSON.stringify(id));
  };

  render() {
    const { authors, id, img, shelf, title, handleData } = this.props;
    const path = `/details/${id}`;
    return (
      <li className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 188,
              backgroundImage: `url(${img})`
            }}
          />
          <div className="book-shelf-changer">
            <select id={id} value={shelf} onChange={this.handleChangeShelf}>
              <option value="move" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">
          <Link to={path} onClick={this.handleClick} className="link">
            {title}
          </Link>
        </div>
        <div className="book-authors">{handleData(authors)}</div>
      </li>
    );
  }
}
export default Book;

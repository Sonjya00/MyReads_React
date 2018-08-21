import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";

class BookDetails extends Component {
  state = {
    book: "",
    bookId: "",
    shelf: "none"
  };

  componentDidMount() {
    const bookId = JSON.parse(localStorage.getItem("bookId"));
    BooksAPI.get(bookId).then(data => {
      this.setState({
        book: data,
        bookId: bookId,
        shelf: data.shelf
      });
    });
  }

  handleChangeShelf__BD = event => {
    this.state.shelf = event.target.value;
    this.props.onUpdateShelves__BD(
      this.state.book,
      event.target.value,
      this.state.bookId
    );
  };

  render() {
    const {
      id,
      authors,
      canonicalVolumeLink,
      categories,
      description,
      pageCount,
      publishedDate,
      publisher,
      language,
      title
    } = this.state.book;
    const shelf = this.state.shelf;
    return (
      <div className="book-details__container">
        <Link to={"/"} className="close-search--details">
          Close
        </Link>
        <div className="book-details__book">
          <div className="book-details__title">
            <h1>{title}</h1>
            {authors && <p className="book-details__author">By {authors}</p>}
          </div>
          <div className="book-details__top">
            <div className="book-details__top--left">
              <div className="book-details--book-cover">
                <div
                  className="book-details--book-cover--img"
                  style={{
                    width: 192,
                    height: 282,
                    backgroundImage: `url(${
                      this.state.book.imageLinks
                        ? this.state.book.imageLinks.thumbnail
                        : ""
                    })`
                  }}
                />
                <div className="book-shelf-changer">
                  <select
                    id={id}
                    value={shelf}
                    onChange={this.handleChangeShelf__BD}
                  >
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
            </div>
          </div>
          <div className="book-details__top--right">
            <ul className="book-details--info">
              <li>
                <span className="book-details--strong">Category: </span>
                {categories ? categories : "N/A"}
              </li>
              <li>
                <span className="book-details--strong">Language: </span>
                {language ? language : "N/A"}
              </li>
              <li>
                <span className="book-details--strong">Pages: </span>
                {pageCount ? pageCount : "N/A"}
              </li>
              <li>
                <span className="book-details--strong">Published in: </span>
                {publishedDate ? publishedDate : "N/A"}
              </li>
              <li>
                <span className="book-details--strong">Publisher: </span>
                {publisher ? publisher : "N/A"}
              </li>
            </ul>
            <a href={canonicalVolumeLink} target="_blank">
              More about this book
            </a>
          </div>
          {description && (
            <div className="book-details__overview">
              <h2 className="book-details__overview__title">Overview</h2>
              <p className="book-details__overview__description">
                {description}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default BookDetails;

import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";

class BookDetails extends Component {
  state = {
    book: "",
    bookId: "",
    authors: [],
    categories: [],
    shelf: "none",
    loading: true
  };

  // Get the book info via its id stored inside of localstorage
  componentDidMount() {
    const bookId = JSON.parse(localStorage.getItem("bookId"));
    BooksAPI.get(bookId).then(data => {
      this.setState({
        book: data,
        bookId: bookId,
        authors: this.props.handleArrays(data.authors),
        categories: this.props.handleArrays(data.categories),
        shelf: data.shelf,
        loading: false
      });
    });
  }

  // When the shelf is changed with the select, the shelf on the state updates
  // And the new data is sent to App
  handleChangeShelf = event => {
    this.setState({
      shelf: event.target.value
    });
    this.props.onUpdateRemoteShelves(this.state.book, event.target.value);
  };

  render() {
    const {
      canonicalVolumeLink,
      description,
      id,
      imageLinks,
      language,
      pageCount,
      publishedDate,
      publisher,
      title
    } = this.state.book;
    const { authors, categories, shelf } = this.state;
    return (
      <div className="book-details__container">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        {/* https://www.materialui.co/icon/clear */}
        <Link to="/" className="close-bookdetails">
          <svg
            className="close-book-details"
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
          >
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        </Link>

        {this.state.loading === true ? (
          <div className="book-details__book">
            <div className="book-details__title">
              <div className="query-result">
                <p>Loading Book Info... </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="book-details__book">
            <div className="book-details__title">
              <h2>{title}</h2>
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
                        imageLinks ? imageLinks.thumbnail : ""
                      })`
                    }}
                  />
                  <div className="book-shelf-changer">
                    <select
                      id={id}
                      value={shelf}
                      onChange={this.handleChangeShelf}
                    >
                      <option value="move" disabled>
                        Move to...
                      </option>
                      <option value="currentlyReading">
                        Currently Reading
                      </option>
                      <option value="wantToRead">Want to Read</option>
                      <option value="read">Read</option>
                      <option value="none">None</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="book-details__top--right">
                {shelf === "currentlyReading" ? (
                  <span className="shelf-tag shelf-reading">Now Reading</span>
                ) : shelf === "wantToRead" ? (
                  <span className="shelf-tag shelf-want-to-read">
                    Want to read
                  </span>
                ) : shelf === "read" ? (
                  <span className="shelf-tag shelf-read">Already Read</span>
                ) : (
                  <span className="shelf-tag shelf-none">Read</span>
                )}
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
                    <span className="book-details--strong">Publisher: </span>
                    {publisher ? publisher : "N/A"}
                  </li>
                  <li>
                    <span className="book-details--strong">
                      Date of publication:{" "}
                    </span>
                    {publishedDate ? publishedDate : "N/A"}
                  </li>
                </ul>
                <a
                  href={canonicalVolumeLink}
                  target="_blank"
                  className="link book-details--weblink"
                >
                  Find on the web
                </a>
              </div>
            </div>
            {description && (
              <div className="book-details__overview">
                <h3 className="book-details__overview__title">Overview</h3>
                <p className="book-details__overview__description">
                  {description}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default BookDetails;

import React, { Component } from "react";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";
import * as BooksAPI from "./BooksAPI";

class BookDetails extends Component {
  state = {
    book: "",
    shelf: "none",
    loading: true
  };

  // Get the book info via its id stored inside of localstorage
  componentDidMount() {
    const bookId = JSON.parse(localStorage.getItem("bookId"));
    BooksAPI.get(bookId).then(data => {
      this.setState({
        book: data,
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
      authors,
      averageRating,
      canonicalVolumeLink,
      categories,
      description,
      id,
      imageLinks,
      language,
      pageCount,
      publishedDate,
      publisher,
      ratingsCount,
      subtitle,
      title
    } = this.state.book;
    const { shelf } = this.state;
    const { handleData } = this.props;
    // component to render all the book details displayed.
    // it calls handleData, which then may call handleArrayy, to properly
    //display any type of data, if the data is available.
    const bookInfoLi = (info, title) => {
      if (info) {
        return (
          <li>
            <span className="book-details--strong">{title}: </span>
            <span className="">{handleData(info)}</span>
          </li>
        );
      }
    };
    return (
      <div className="book-details__container">
        <div className="list-books__top-bar">
          <h1 className="list-books__title">
            <Link to="/">MyReads</Link>
          </h1>
        </div>
        <Link to="/" aria-label="Back to homepage">
          <svg
            className="icon__close"
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
          >
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        </Link>
        {/* 2 possible screens: 1. loading; 2. showing book details */}
        {this.state.loading === true ? (
          <div className="book-details__main">
            <div className="book-details__title">
              <div className="query-result--g">
                <p>Loading Book Info... </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="book-details__main">
            <div className="book-details__title">
              <h2 className="heading--secondary">
                {title} {subtitle && <span>: {handleData(subtitle)}</span>}
              </h2>

              {authors && (
                <p className="book-details__author">By {handleData(authors)}</p>
              )}
            </div>
            <div className="book-details__body">
              <div className="book-details__section-1">
                <div className="book-details__book-cover">
                  <div
                    className="book-details__book-cover--img"
                    style={{
                      width: 192,
                      height: 282,
                      backgroundImage: `url(${
                        imageLinks ? imageLinks.thumbnail : ""
                      })`
                    }}
                  >
                    {" "}
                    {!imageLinks && (
                      <span className="book-cover--alt">
                        Image not available
                      </span>
                    )}
                  </div>
                  <div className="book-shelf-changer--g">
                    <select
                      id={id}
                      value={shelf}
                      aria-label="Select shelf"
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
                  {shelf === "currentlyReading" ? (
                    <div className="shelf-tag shelf-reading">
                      <span>Now reading</span>
                    </div>
                  ) : shelf === "wantToRead" ? (
                    <div className="shelf-tag shelf-want-to-read">
                      <span>Want to read</span>
                    </div>
                  ) : shelf === "read" ? (
                    <div className="shelf-tag shelf-read">
                      <span>Already read</span>
                    </div>
                  ) : (
                    <div className="shelf-tag shelf-none">
                      <span>Not on shelf</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="book-details__section-2">
                <div className="book-details__info">
                  <h3 className="book-details__info--title heading--tertiary">
                    Details about this book
                  </h3>
                  <ul className="book-details__info--list">
                    <li>
                      <span className="book-details--strong rating">
                        Rating:{" "}
                      </span>
                      <span className="">
                        {averageRating
                          ? `${averageRating} (${ratingsCount} votes) `
                          : `Not rated yet`}
                      </span>
                    </li>
                    {bookInfoLi(categories, "Category")}
                    {bookInfoLi(language, "Language")}
                    {bookInfoLi(pageCount, "Pages")}
                    {bookInfoLi(publisher, "Publisher")}
                    {bookInfoLi(publishedDate, "Publication Date")}
                  </ul>
                  {canonicalVolumeLink && (
                    <a
                      href={canonicalVolumeLink}
                      target="_blank"
                      className="link book-details--weblink"
                    >
                      Find on the web
                    </a>
                  )}
                </div>
              </div>
              {description && (
                <div className="book-details__section-3">
                  <h3 className="book-details__overview--title heading--tertiary">
                    Overview
                  </h3>
                  <p className="book-details__overview--description">
                    {description}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

BookDetails.propTypes = {
  updateRemoteShelves: PropTypes.func,
  handleData: PropTypes.func
};

export default BookDetails;

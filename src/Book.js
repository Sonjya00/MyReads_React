import React, { Component } from "react";
import { Link } from "react-router-dom";

class Book extends Component {
  state = {
    shelf: "none"
  };

  componentDidMount() {
    this.setState({
      shelf: this.props.shelf
    });
  }

  // When the book changes shelf,
  // call onUpdateShelves on either MyBooks or SearchBooks and send the new data
  handleChangeShelf = event => {
    this.props.onUpdateShelves(this.props, event.target.value);
  };

  // Upon opening BookDetails, send the book id to MyBooks or SearchBooks,
  // which will then send it to App.
  // Then store the id to the localStorage (or Bookdetails will lose this data
  // upon refresh).
  handleClick = id => {
    id = this.props.id;
    this.props.onsendBookId(id);
    localStorage.setItem("bookId", JSON.stringify(id));
  };

  render() {
    const { img, id, title, author } = this.props;
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
            <select
              id={id}
              value={this.state.shelf}
              onChange={this.handleChangeShelf}
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
        <div className="book-title">
          <Link to={path} onClick={this.handleClick} className="link">
            {title}
          </Link>
        </div>
        <div className="book-authors">{author}</div>
      </li>
    );
  }
}
export default Book;

import React, { Component } from "react";

class Book extends Component {
  componentDidMount() {
    document.getElementById(this.props.id).value = this.props.shelf;
  }

  render() {
    return (
      <li key={this.props.id} className="book">
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 188,
                backgroundImage: `url(${this.props.img})`
              }}
            />
            <div className="book-shelf-changer">
              <select id={this.props.id}>
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
          <div className="book-title">{this.props.title}</div>
          <div className="book-authors">{this.props.author}</div>
        </div>
      </li>
    );
  }
}
export default Book;

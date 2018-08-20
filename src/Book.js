import React, { Component } from "react";

class Book extends Component {
  state = {
    shelf: "none"
  };

  componentDidMount() {
    this.setState({
      shelf: this.props.shelf
    });
  }

  handleChangeShelf = event => {
    this.props.onUpdateShelves(this.props, event.target.value);
  };

  render() {
    const { img, id, title, author } = this.props;
    return (
      <li className="book">
        <div className="book">
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
                // onChange={event => this.changeShelf(event.target.value)}
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
          <div className="book-title">{title}</div>
          <div className="book-authors">{author}</div>
        </div>
      </li>
    );
  }
}
export default Book;

import React, { Component } from "react";
import { Link } from "react-router-dom";
import escapeRegExp from "escape-string-regexp";
import sortBy from "sort-by";
import * as BooksAPI from "./BooksAPI";
import Book from "./Book.js";

class SearchBooks extends Component {
  state = {
    query: "",
    showingBooks: [],
    loading: false
  };

  updateQuery = query => {
    this.setState({
      query: query,
      loading: true
    });
    this.searchBooks(query);
  };

  clearQuery = () => {
    this.setState({
      query: "",
      showingBooks: []
    });
  };

  selectKeyword = e => {
    const newQuery = e.target.textContent;
    this.updateQuery(newQuery);
  };

  searchBooks = query => {
    BooksAPI.search(query).then(data => {
      if (data && data.length > 0) {
        this.setState({
          showingBooks: data,
          loading: false
        });
      } else {
        this.setState({
          showingBooks: [],
          loading: false
        });
      }
    });
  };

  sendBookId = id => {
    this.props.getBookId(id);
  };

  render() {
    const { updateShelves } = this.props;
    const { query, showingBooks } = this.state;

    // let showingBooks;
    // if (query) {
    //   const match = new RegExp(escapeRegExp(query), "i");
    //   showingBooks = books.filter(book => match.test(book.title));
    // } else {
    //   showingBooks = books;
    // }

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            {/*
                NOTES: The search from BooksAPI is limited to a particular set of search terms.
                You can find these search terms here:
                https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                you don't find a specific author or title. Every search is limited by search terms.
              */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={event => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          {showingBooks.length > 0 && (
            <div class="query-result">
              <p>Showing {showingBooks.length} results - </p>
              <button class="reset-query-btn" onClick={this.clearQuery}>
                Reset search
              </button>
            </div>
          )}
          <ol className="books-grid">
            {/* BEGINNING OF CONDITIONAL RENDERING, 4 OPTIONS */}
            {showingBooks.length > 0 ? (
              // If there are books that match the query, show the books
              showingBooks.map(book => (
                <Book
                  key={book.id}
                  onUpdateShelves={(book, shelf) => updateShelves(book, shelf)}
                  sendBookId={this.sendBookId}
                  id={book.id}
                  shelf={book.shelf}
                  img={book.imageLinks ? book.imageLinks.smallThumbnail : ""}
                  title={book.title}
                  author={book.authors}
                />
              ))
            ) : this.state.query === "" ? (
              // If there are no matching results, check if the query is empty.
              // If it is, show initial screen with suggested keywords
              <div className="keywords-screen">
                <h2>Suggested Keywords</h2>
                <h3>Authors</h3>
                <div onClick={this.selectKeyword}>
                  “<button className="keyword-btn">Austen</button>
                  ”, “<button className="keyword-btn">Bhagat</button>
                  ”, “<button className="keyword-btn">Camus</button>
                  ”, “<button className="keyword-btn">Cervantes</button>
                  ”, “<button className="keyword-btn">Christie</button>
                  ”, “<button className="keyword-btn">Desai</button>
                  ”, “<button className="keyword-btn">Dumas</button>
                  ”, “<button className="keyword-btn">Gandhi</button>
                  ”, “<button className="keyword-btn">Homer</button>
                  ”, “<button className="keyword-btn">Hugo</button>
                  ”, “<button className="keyword-btn">Ibsen</button>
                  ”, “<button className="keyword-btn">Kafka</button>
                  ”, “<button className="keyword-btn">King</button>
                  ”, “<button className="keyword-btn">Lahiri</button>
                  ”, “<button className="keyword-btn">Larsson</button>
                  ”, “<button className="keyword-btn">Marquez</button>
                  ”, “<button className="keyword-btn">Rowling</button>
                  ”, “<button className="keyword-btn">Singh</button>
                  ”, “<button className="keyword-btn">Shakespear</button>
                  ”, “<button className="keyword-btn">Tolstoy</button>
                  ”, “<button className="keyword-btn">Thrun</button>”
                </div>
                <h3>Genre</h3>
                <div onClick={this.selectKeyword}>
                  “<button className="keyword-btn">Biography</button>
                  ”, “<button className="keyword-btn">Classics</button>
                  ”, “<button className="keyword-btn">Comics</button>
                  ”, “<button className="keyword-btn">Drama</button>
                  ”, “<button className="keyword-btn">Fantasy</button>
                  ”, “<button className="keyword-btn">Fiction</button>
                  ”, “<button className="keyword-btn">Horror</button>
                  ”, “<button className="keyword-btn">Literary</button>
                  ”, “<button className="keyword-btn">Mystery</button>
                  ”, “<button className="keyword-btn">Philosophy</button>
                  ”, “<button className="keyword-btn">Poetry</button>
                  ”, “<button className="keyword-btn">Satire</button>
                  ”, “<button className="keyword-btn">Science Fiction</button>
                  ”, “<button className="keyword-btn">Tale</button>”
                </div>
                <h3>Technology</h3>
                <div onClick={this.selectKeyword}>
                  “<button className="keyword-btn">Android</button>
                  ”, “
                  <button className="keyword-btn">
                    Artificial Intelligence
                  </button>
                  ”, “<button className="keyword-btn">Design</button>
                  ”, “<button className="keyword-btn">Development</button>
                  ”, “<button className="keyword-btn">Programming</button>
                  ”, “<button className="keyword-btn">Robotics</button>
                  ”, “<button className="keyword-btn">React</button>
                  ”, “<button className="keyword-btn">Redux</button>
                  ”, “<button className="keyword-btn">Virtual Reality</button>
                  ”, “<button className="keyword-btn">Web Development</button>
                  ”, “<button className="keyword-btn">iOS</button>”
                </div>
                <h3>Economy</h3>
                <div onClick={this.selectKeyword}>
                  “<button className="keyword-btn">Business</button>
                  ”, “<button className="keyword-btn">Digital Marketing</button>
                  ”, “<button className="keyword-btn">Finance</button>
                  ”, “<button className="keyword-btn">Manage</button>
                  ”, “<button className="keyword-btn">Money</button>
                  ”, “<button className="keyword-btn">Negotiate</button>
                  ”, “<button className="keyword-btn">Production</button>”
                </div>
                <h3>Sport</h3>
                <div onClick={this.selectKeyword}>
                  “<button className="keyword-btn">Baseball</button>
                  ”, “<button className="keyword-btn">Basketball</button>
                  ”, “<button className="keyword-btn">Cricket</button>
                  ”, “<button className="keyword-btn">Cycling</button>
                  ”, “<button className="keyword-btn">Fitness</button>
                  ”, “<button className="keyword-btn">Football</button>
                  ”, “<button className="keyword-btn">Swimming</button>”
                </div>
                <h3>Skills, Art & Hobbies</h3>
                <div onClick={this.selectKeyword}>
                  “<button className="keyword-btn">Art</button>
                  ”,
                  <button className="keyword-btn">Astronomy</button>
                  ”, “<button className="keyword-btn">Cook</button>
                  ”,“
                  <button className="keyword-btn">Drawing</button>
                  ”, “<button className="keyword-btn">Education</button>
                  ”, “<button className="keyword-btn">Film</button>
                  ”, “<button className="keyword-btn">“Learn</button>” ”, “
                  <button className="keyword-btn">Painting</button>
                  ”, “<button className="keyword-btn">Photography</button>”
                </div>
                <h3>Miscellaneous</h3>
                <div onClick={this.selectKeyword}>
                  “<button className="keyword-btn">Brief</button>
                  ”, “<button className="keyword-btn">Everything</button>
                  ”, “<button className="keyword-btn">First</button>
                  ”, “<button className="keyword-btn">Future</button>
                  ”, “<button className="keyword-btn">Games</button>
                  ”, “<button className="keyword-btn">Journey</button>
                  ”, “<button className="keyword-btn">River</button>
                  ”, “<button className="keyword-btn">Time</button>
                  ”, “<button className="keyword-btn">Travel</button>
                  ”, “<button className="keyword-btn">Ultimate</button>”
                </div>
              </div>
            ) : this.state.loading === true ? (
              // If there are no matching books, but there is a query,
              // see if it's still loading.
              // If it's still loading, show loading message
              <div className="query-result">
                <p>Loading results... </p>
              </div>
            ) : (
              // If it isn't, show no results screen
              <div className="query-result">
                <p>No results found - </p>
                <button className="reset-query-btn" onClick={this.clearQuery}>
                  Reset search
                </button>
              </div>
            )}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBooks;

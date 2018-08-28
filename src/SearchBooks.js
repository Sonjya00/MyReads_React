import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import Book from "./Book";

class SearchBooks extends Component {
  state = {
    query: "",
    showingBooks: [],
    loading: false
  };

  // Called when some query is typed or selected by clicking a keyword.
  // It calls searchBook and sends the query to it
  // Status is set to loading to get a loading message
  updateQuery = query => {
    this.setState({
      query: query,
      loading: true
    });
    this.searchBooks(query);
  };

  // Clean the query and reset showing book array
  clearQuery = () => {
    this.setState({
      query: "",
      showingBooks: []
    });
  };

  // Send the keyword selected to the updateQuery method
  selectKeyword = e => {
    if (e.target.nodeName === "BUTTON") {
      const newQuery = e.target.textContent;
      this.updateQuery(newQuery);
    }
  };

  // Use the query to search for matching books.
  // Update the showing books (with either the results or the no results message)
  // Loading status is turned off
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

  render() {
    const { updateRemoteShelves, handleData } = this.props;
    const { query, showingBooks } = this.state;
    const keywords = {
      authors: [
        "Austen",
        "Bhagat",
        "Camus",
        "Cervantes",
        "Christie",
        "Desai",
        "Dumas",
        "Gandhi",
        "Homer",
        "Hugo",
        "Ibsen",
        "Kafka",
        "King",
        "Lahiri",
        "Larsson",
        "Marquez",
        "Rowling",
        "Singh",
        "Shakespeare",
        "Tolstoy",
        "Thrun"
      ],
      genre: [
        "Biography",
        "Classics",
        "Comics",
        "Drama",
        "Fantasy",
        "Fiction",
        "Horror",
        "Literary",
        "Mystery",
        "Philosophy",
        "Poetry",
        "Satire",
        "Science Fiction",
        "Tale"
      ],
      technology: [
        "Android",
        "Artificial Intelligence",
        "Design",
        "Development",
        "Programming",
        "Robotics",
        "React",
        "Redux",
        "Virtual Reality",
        "Web Development",
        "iOS"
      ],
      economy: [
        "Business",
        "Digital Marketing",
        "Finance",
        "Manage",
        "Money",
        "Negotiate",
        "Production"
      ],
      sport: [
        "Baseball",
        "Basketball",
        "Cricket",
        "Cycling",
        "Fitness",
        "Football",
        "Swimming"
      ],
      art: [
        "Art",
        "Astronomy",
        "Cook",
        "Drawing",
        "Education",
        "Film",
        "Learn",
        "Painting",
        "Photography"
      ],
      misc: [
        "Brief",
        "Everything",
        "First",
        "Future",
        "Games",
        "Journey",
        "River",
        "Time",
        "Travel",
        "Ultimate"
      ]
    };
    const keywordSection = keywords =>
      keywords.map((keyword, index) => (
        <div key={index} className="keywords-group">
          <button className="keyword-btn">{keyword}</button>
        </div>
      ));
    return (
      <div className="search-books">
        <div className="search-books__bar">
          <Link to="/" className="icon__back-arrow">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 18 18"
            >
              <path d="M15 8.25H5.87l4.19-4.19L9 3 3 9l6 6 1.06-1.06-4.19-4.19H15v-1.5z" />
            </svg>
          </Link>
          <div className="search-books__input-wrapper">
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
        <div className="search-books__main">
          {showingBooks.length > 0 && (
            <div className="query-result--g">
              <p>Showing {showingBooks.length} results - </p>
              <button className="reset-query-btn" onClick={this.clearQuery}>
                Reset search
              </button>
            </div>
          )}
          <ol className="books-grid--g">
            {/* BEGINNING OF CONDITIONAL RENDERING, 4 OPTIONS */}
            {showingBooks.length > 0 ? (
              // If there are books that match the query, show the books
              // NOTE: this book has different props than the book components in MyBook,
              // do not sync
              showingBooks.map(book => {
                console.log(book);
                const { id, imageLinks, title, authors } = book;
                return (
                  <Book
                    key={id}
                    id={id}
                    img={imageLinks ? imageLinks.smallThumbnail : ""}
                    title={title}
                    authors={authors}
                    onUpdateRemoteShelves={(book, shelf) =>
                      updateRemoteShelves(book, shelf)
                    }
                    handleData={handleData}
                  />
                );
              })
            ) : this.state.query === "" ? (
              // If there are no matching results, check if the query is empty.
              // If it is, show initial screen with suggested keywords
              <div
                className="search-books__keywords-screen"
                onClick={this.selectKeyword}
              >
                <h2 className="heading--secondary">Suggested Keywords</h2>
                <h3 className="heading--tertiary">Authors</h3>
                {keywordSection(keywords.authors)}
                <h3 className="heading--tertiary">Genre</h3>
                {keywordSection(keywords.genre)}
                <h3 className="heading--tertiary">Technology</h3>
                {keywordSection(keywords.technology)}
                <h3 className="heading--tertiary">Economy</h3>
                {keywordSection(keywords.economy)}
                <h3 className="heading--tertiary">Sport</h3>
                {keywordSection(keywords.sport)}
                <h3 className="heading--tertiary">Skills, Art & Hobbies</h3>
                {keywordSection(keywords.art)}
                <h3 className="heading--tertiary">Miscellaneous</h3>
                {keywordSection(keywords.misc)}
              </div>
            ) : this.state.loading === true ? (
              // If there are no matching books, but there is a query,
              // see if it's still loading.
              // If it's still loading, show loading message
              <div className="query-result--g">
                <p>Loading results... </p>
              </div>
            ) : (
              // If it isn't, show no results screen
              <div className="query-result--g">
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

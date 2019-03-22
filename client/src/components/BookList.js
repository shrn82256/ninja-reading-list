import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getBooksQuery } from "../queries/queries";

import BookDetails from "./BookDetails";

class BookList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: null
    };
  }

  updateSelection = e => {
    console.log(e.target.getAttribute("data-key"));
    this.setState({
      ...this.state,
      selected: e.target.getAttribute("data-key")
    });
  };

  displayBooks = () => {
    var data = this.props.data;

    if (data.loading) {
      return <div>Loading Books...</div>;
    } else {
      return data.books.map(book => (
        <li key={book.id} data-key={book.id} onClick={this.updateSelection}>
          {book.name}
        </li>
      ));
    }
  };

  render() {
    return (
      <div className="BookList">
        <ul id="book-list">{this.displayBooks()}</ul>
        <BookDetails bookId={this.state.selected} />
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);

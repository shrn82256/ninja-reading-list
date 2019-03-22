import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import {
  getBooksQuery,
  getAuthorsQuery,
  addBookMutation
} from "../queries/queries";

class AddBook extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      genre: "",
      authorId: ""
    };
  }

  displayAuthors = () => {
    var data = this.props.getAuthorsQuery;

    if (data.loading) {
      return <option disabled>Loading Authors...</option>;
    } else {
      return data.authors.map(author => (
        <option key={author.id} value={author.id}>
          {author.name}
        </option>
      ));
    }
  };

  handleChange = e => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.addBookMutation({
      variables: {
        name: this.state.name,
        genre: this.state.genre,
        authorId: this.state.authorId
      },
      refetchQueries: [{ query: getBooksQuery }]
    });
  };

  render() {
    return (
      <div className="AddBook">
        <form id="add-book" onSubmit={this.handleSubmit}>
          <div className="field">
            <label>Book Name:</label>
            <input type="text" name="name" onChange={this.handleChange} />
          </div>
          <div className="field">
            <label>Genre:</label>
            <input type="text" name="genre" onChange={this.handleChange} />
          </div>
          <div className="field">
            <label>Author:</label>
            <select name="authorId" onChange={this.handleChange}>
              <option>Select Author</option>
              {this.displayAuthors()}
            </select>
          </div>
          <button>+</button>
        </form>
      </div>
    );
  }
}

export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);

import React from "react";
import { createRoot } from "react-dom/client";

const root = createRoot(document.querySelector("#root"));

class App extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    searchQuery: "",
    users: ["Jan Kowalski", "Michał Nowak"],
  };

  renderUsersList() {
    const filteredUsers = this.filterUsersList();

    return filteredUsers.map((name) => {
      return <li onClick={this.clickHandler}>{name}</li>;
    });
  }

  filterUsersList() {
    const {users, searchQuery} = this.state;
    const regex = new RegExp(searchQuery);

    const filteredUsers = users.filter((name) => {
      return searchQuery === "" || regex.test(name);
    });
    
    return filteredUsers;
  }

  handleSearchQuery = (evt) => {
    const { name, value } = evt.target;
    this.setState({
      [name]: value,
    });
  };

  clickHandler = (e) => {
    const { innerText: userName } = e.target;
    this.removeUser(userName);
  };

  inputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { firstName, lastName, searchQuery } = this.state;
    return (
      <section onSubmit={this.submitHandler}>
        <form>
          <input
            name="firstName"
            value={firstName}
            onChange={this.inputChange}
          />
          <input name="lastName" value={lastName} onChange={this.inputChange} />
          <input type="submit" />
        </form>
        <input
          name="searchQuery"
          value={searchQuery}
          onChange={this.handleSearchQuery}
        />
        <ul>{this.renderUsersList()}</ul>
      </section>
    );
  }

  submitHandler = (e) => {
    e.preventDefault();

    const { firstName, lastName } = this.state;
    if (firstName && lastName) {
      this.addUser(`${firstName} ${lastName}`);
      this.setState({
        firstName: "",
        lastName: "",
      });
    } else {
      // tutaj komunikat dla użytkownika
    }
  };

  addUser(name) {
    this.setState({
      users: [...this.state.users, name],
    });
  }

  removeUser(name) {
    const currUsers = this.state.users.filter((user) => user != name);

    this.setState({
      users: currUsers,
    });
  }
}

root.render(<App />);

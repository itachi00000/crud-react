import React from 'react';
// import InputField from './InputField';

export default class AddRow extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      username: '',
      email: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  }

  handleClick(e) {
    e.preventDefault();
    const { addUser } = this.props;
    const { name, username, email } = this.state;

    addUser(e, { name, username, email });

    // reset this.state, after clicked
    this.setState({
      name: '',
      username: '',
      email: ''
    });
  }

  // handleSubmit(e) {
  //   e.preventDefault();
  //   const { nextId, addUser } = this.props;
  //   const { name, username, email } = this.state;

  //   addUser(e, { name, username, email, nextId });
  //   console.log(e);
  //   // reset this.state, after clicked
  //   this.setState({
  //     name: '',
  //     username: '',
  //     email: ''
  //   });
  // }

  render() {
    const { name, username, email } = this.state;

    return (
      <tr>
        <td> </td>
        <td>
          <input
            onChange={this.handleChange}
            type="text"
            value={name}
            name="name"
            placeholder="Enter Name"
            className="form-control"
          />
        </td>
        <td>
          <textarea
            onChange={this.handleChange}
            value={username}
            name="username"
            placeholder="Enter username"
            className="form-control"
            rows="1"
          />
        </td>
        <td>
          <input
            onChange={this.handleChange}
            type="email"
            value={email}
            name="email"
            placeholder="enter email"
            className="form-control"
          />
          {/* <InputField
            onChange={this.handleChange}
            type="email"
            value={email}
            name="email"
            placeholder="enter email"
          /> */}
        </td>
        <td>
          <button
            type="button"
            onClick={this.handleClick}
            className="btn btn-success btn-block"
          >
            Add User
          </button>
        </td>
      </tr>
    );
  }
}

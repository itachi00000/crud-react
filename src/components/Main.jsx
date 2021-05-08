import React from 'react';
import axios from 'axios';
// import uuid from 'uuid';

import Table from './Table';
// import userData from '../users.json';
// import Loading from './Loading';

// jsonplaceholder
const fakeApiUrl = 'https://jsonplaceholder.typicode.com';

// main
class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      searchfield: '',
      // alerts, status
      status: { isEditing: false, currentId: null },
      alerts: {
        isLoading: false,
        isEmpty: false,
        isError: false,
        isSuccess: false,
        alertMsg: ''
      }
    };
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onDelUser = this.onDelUser.bind(this);
    this.onAddUser = this.onAddUser.bind(this);
    this.onEditUser = this.onEditUser.bind(this);
    this.onUpdateUser = this.onUpdateUser.bind(this);
  }

  componentDidMount() {
    this.setState(prevState => {
      return {
        alerts: { ...prevState.alerts, isLoading: true, alertMsg: 'Loading...' }
      };
    });

    // get all?
    axios
      .get(`${fakeApiUrl}/users`)
      .then(users =>
        this.setState(prevState => {
          return {
            users: users.data,
            alerts: {
              ...prevState.alerts,
              isLoading: false,
              isSuccess: true,
              alertMsg: 'Fetch Success'
            }
          };
        })
      )
      .catch(error =>
        this.setState(prevState => {
          return {
            alerts: {
              ...prevState.alerts,
              isError: true,
              isLoading: false,
              alertMsg: error.message
            }
          };
        })
      );

    setTimeout(() => {
      this.setState(prevState => {
        return {
          alerts: {
            ...prevState.alerts,
            isSuccess: false,
            alertMsg: ''
          }
        };
      });
    }, 1500);
  }

  // componentDidUpdate(prevState) {
  //   if (prevState.users !== this.state.users) {
  //     // this.fetchData();
  //     console.log('a');
  //   }
  // }

  onSearchChange(e) {
    this.setState({ searchfield: e.target.value });
  }

  onDelUser(e, id) {
    const { status } = this.state;

    // on editing mode, you cant click delete btn
    if (status.isEditing) return;
    console.log('deleted', id);

    axios
      .delete(`${fakeApiUrl}/users/${id}`)
      .then(() => {
        this.setState(prevState => {
          return { users: prevState.users.filter(user => user.id !== id) };
        });
      })
      .catch(err => {
        if (err.response) {
          console.log('err.response.data', err.response.data.msg);
          console.log('err.response.status:', err.response.status);
          this.setState(prevState => {
            return {
              alerts: {
                ...prevState.alerts,
                isError: true,
                alertMsg: `${err.response.data}`
              }
            };
          });
        } else if (err.request) {
          console.log('err.request', err.request);
        } else {
          console.log(`Error msg: ${err.message}`);
        }
      });
  }

  //
  onEditUser(e, id) {
    // toggles the 'isEditing'
    this.setState(prevState => {
      return {
        status: {
          isEditing: !prevState.status.isEditing,
          currentId: id
        }
      };
    });
  }

  // update user
  onUpdateUser(e, { id, name, username, email }) {
    // if blank inputs
    if (!name || !email || !username) {
      this.setState(prevState => {
        return {
          alerts: { ...prevState.alerts, isEmpty: true, alertMsg: 'Enter Text' }
        };
      });
      return;
    }

    const asyncFetch = async () => {
      try {
        await axios.put(`${fakeApiUrl}/users/${id}`, {
          name,
          username,
          email
        });

        return this.setState(prevState => {
          const updatedUsers = prevState.users.map(user => {
            let newUser = null;
            if (user.id === id) {
              newUser = {
                id,
                name,
                username,
                email
              };
            }
            return newUser || user;
          });

          return {
            users: updatedUsers,
            alerts: {
              ...prevState.alerts,
              isEmpty: false,
              isSuccess: true,
              alertMsg: 'Edit Success'
            }
          };
        });
      } catch (error) {
        return console.log(error.message);
      }
    };

    asyncFetch();

    // PUT method
    // axios
    //   .put(`http://localhost:5000/robots/${id}`, { name, username, email })
    //   .then(userUpd => {
    //     this.setState(prevState => {
    //       const updatedUsers = prevState.users.map(user => {
    //         let newUser = null;
    //         if (user.id === id) {
    //           newUser = {
    //             id,
    //             name,
    //             username,
    //             email
    //           };
    //         }

    //         return newUser || user;
    //       });

    //       return {
    //         users: updatedUsers,
    //         alerts: {
    //           ...prevState.alerts,
    //           isEmpty: false,
    //           isSuccess: true,
    //           alertMsg: 'Edit Success'
    //         }
    //       };
    //     });

    //  reset the status to default
    this.setState(prevState => ({
      status: { ...prevState.status, isEditing: false, currentId: null }
    }));

    // timeout
    setTimeout(() => {
      this.setState(prevState => ({
        alerts: {
          ...prevState.alerts,
          isSuccess: false,
          alertMsg: ''
        }
      }));
    }, 1500);
  }

  onAddUser(e, { name, username, email }) {
    // if empty inputs
    if (!name || !username || !email) {
      this.setState(prevState => {
        return {
          alerts: {
            ...prevState.alerts,
            isEmpty: true,
            isError: false,
            alertMsg: 'Enter Text'
          }
        };
      });
      return;
    }

    const asyncFunc = async () => {
      try {
        const newUser = await axios.post(`${fakeApiUrl}/users`, {
          name,
          username,
          email
        });
        console.log(newUser.data);

        return this.setState(prevState => {
          return {
            users: [...prevState.users, newUser.data],
            alerts: {
              ...prevState.alerts,
              isEmpty: false,
              isError: false
            }
          };
        });
      } catch (error) {
        return console.log(error);
      }
    };

    asyncFunc();

    // axios
    //   .post('http://127.0.0.1:5000/robots', {
    //     name,
    //     username,
    //     email
    //   })
    //   .then(newUser => {
    //     this.setState(prevState => {
    //       return {
    //         users: [...prevState.users, newUser.data],
    //         alerts: {
    //           ...prevState.alerts,
    //           isEmpty: false,
    //           isError: false
    //         }
    //       };
    //     });
    //   })
    //   .catch(err => {
    //     if (err.response) {
    //       console.log('err.response.data', err.response.data.error);
    //       console.log('err.response.status:', err.response.status);
    //       this.setState(prevState => {
    //         return {
    //           alerts: {
    //             ...prevState.alerts,
    //             isError: true,
    //             alertMsg: `${err.response.data.error}defaultError`
    //           }
    //         };
    //       });
    //     } else if (err.request) {
    //       console.log('err.request', err.request);
    //     } else {
    //       console.log(`Error msg: ${err.message}`);
    //     }
    //   });
  }

  // render
  render() {
    const {
      users,
      searchfield,
      status: { isEditing, currentId },
      alerts
    } = this.state;

    // filter based on searchQuery
    const filteredUsers = users.filter(user => {
      // search at name and username
      return user.name.toLowerCase().includes(searchfield.toLowerCase().trim());
    });

    return (
      <main>
        <Table
          users={filteredUsers}
          alerts={alerts}
          searchChange={this.onSearchChange}
          delUser={this.onDelUser}
          addUser={this.onAddUser}
          editUser={this.onEditUser}
          updateUser={this.onUpdateUser}
          editing={isEditing}
          currentId={currentId}
        />
        <div style={{ height: '300px' }} />
      </main>
    );
  }
}

export default Main;

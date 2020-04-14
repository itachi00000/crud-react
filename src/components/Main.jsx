import React from 'react';
import axios from 'axios';
<<<<<<< HEAD
// import uuid from 'uuid';

import Table from './Table';
// import userData from '../users.json';
// import Loading from './Loading';
=======
import uuid from 'uuid';

// import userData from '../users.json';
import Table from './Table';
import Loading from './Loading';

// import Lifecycles from './components/lifecycles';
>>>>>>> 11253bb8713e0a83d599254a1cdb4ca782330eb2

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
    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    this.setState(prevState => {
      return {
        alerts: { ...prevState.alerts, isLoading: true, alertMsg: 'Loading...' }
      };
    });

    axios
      .get('http://127.0.0.1:5000/robots')
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
    // on editing mode, you cant click delete btn
    if (this.state.status.isEditing) return;
    console.log(id);

    axios
      .delete('http://localhost:5000/robots', { data: { id } })
      .then(resp => {
        this.setState(prevState => {
          return { users: prevState.users.filter(user => user.id !== id) };
        });
      })
      .catch(err => console.error('error at delUser: ', err));
  }

  // UI
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

    // PUT method
    axios
      .put('http://localhost:5000/robots', { id, name, username, email })
      .then(userUpd => {
        this.setState(prevState => {
          const updatedUsers = prevState.users.map(user => {
            if (user.id === id) {
              user = { id, name, username, email };
            }
            return user;
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

        // reset the status to default
        this.setState({ status: { isEditing: false, currentId: null } });
      })
      .catch(err => console.error('error at /updateUser: ', err));
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

    axios
      .post('http://127.0.0.1:5000/robots', {
        name,
        username,
        email
      })
      .then(newUser =>
        this.setState(prevState => {
          return {
<<<<<<< HEAD
            users: [...prevState.users, newUser],
=======
>>>>>>> 11253bb8713e0a83d599254a1cdb4ca782330eb2
            alerts: {
              ...prevState.alerts,
              isEmpty: false,
              isError: false
            }
          };
        }, this.fetchData())
      )
      .catch(() => console.error('error at addUser'));
  }

  // fetch data
  fetchData() {
    // fetch('https://jsonplaceholder.typicode.com/users')
<<<<<<< HEAD
=======
    axios
      .get('http://127.0.0.1:5000/robots')
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
>>>>>>> 11253bb8713e0a83d599254a1cdb4ca782330eb2
  }

  // render
  render() {
    const {
      users,
      searchfield,
      status: { isEditing, currentId },
      alerts
    } = this.state;

    // loading if no data
    // if (!users.length) {
    //   return (
    //     <div className="container">
    //       <Loading />
    //     </div>
    //   );
    // }

    // filter based on searchQuery
    const filteredUsers = users.filter(user => {
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

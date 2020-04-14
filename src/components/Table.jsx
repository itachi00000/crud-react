import React from 'react';
import uuid from 'uuid';
import TableBodyRows from './TableBodyRows';
import SearchField from './SearchField';
import AddRow from './AddRow';
import Warning from './Warning';

function Table({
  users,
  alerts,
  searchChange,
  updateUser,
  delUser,
  addUser,
  editUser,
  editing,
  currentId
}) {
  // nextId is the id at 'addUser row',
  // which will be the id for 'newUser'
  // if there is no data item, set the 'nextId' to 1
  // const nextId = users.length ? +users[users.length - 1].id + 1 : 1;
  const hasAlert =
    alerts.isLoading || alerts.isEmpty || alerts.isError || alerts.isSuccess;
  return (
    <div className="container">
      <div className="card mx-auto w-75">
        <div className="card-header text-white bg-info clearfix">
          <div className="row">
            <div className="col">
              <h3>Users Table</h3>
            </div>
            <div className="col">
              <SearchField searchChange={searchChange} />
            </div>
          </div>
        </div>
        {hasAlert && <Warning alerts={alerts} />}
        <div className="card-body">
          <form>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map(user => {
                    return (
                      <TableBodyRows
                        key={uuid.v4()}
                        id={user.id}
                        name={user.name}
                        username={user.username}
                        email={user.email}
                        updateUser={updateUser}
                        delUser={delUser}
                        editUser={editUser}
                        addUser={addUser}
                        editing={editing}
                        currentId={currentId}
                      />
                    );
                  })
                ) : (
                  <tr>
                    <td> </td>
                    <td> </td>
                    <td colSpan={5}>Sorry, No User Available</td>
                  </tr>
                )}

                <AddRow addUser={addUser} />
              </tbody>
            </table>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Table;

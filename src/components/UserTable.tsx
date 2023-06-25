import UserService, { User } from "../services/userService";
import userService from "../services/userService";
import useUsers from "../hooks/useUsers";

const UserTable = () => {
  const { users, error, isLoading, setError, setUsers } = useUsers();

  const deleteUser = (user: User) => {
    const originalUsers = [...users];
    const updatedUsers = users.filter((u) => u.id !== user.id);
    setUsers(updatedUsers);
    userService.delete(user.id).catch((err) => {
      setError(err.message);
      setUsers(originalUsers);
    });
  };

  const addUser = () => {
    const originalUsers = [...users];
    const newUser = { id: 0, name: "Dugi" };
    setUsers([...users, newUser]);
    userService
      .create(newUser)
      .then((res) => setUsers([...users, res.data]))
      .catch((err) => {
        setError(err.message);
        setUsers(originalUsers);
      });
  };

  const updateUser = (user: User) => {
    const originalUsers = [...users];

    const updatedUser = { ...user, name: user.name + "!" };
    setUsers(users.map((u) => (u.id === user.id ? updatedUser : u)));

    UserService.update(updatedUser).catch((err) => {
      setUsers(originalUsers);
      err.message;
    });
  };

  return (
    <>
      {error && <p className="text-danger">{error}</p>}
      {isLoading ? (
        <div className="spinner-border"></div>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>ID</th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => deleteUser(user)}
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => updateUser(user)}
                    className="btn btn-success"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button className="btn btn-info" onClick={addUser}>
        AddUser
      </button>
    </>
  );
};

export default UserTable;

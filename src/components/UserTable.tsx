import { useEffect, useState } from "react";
import { CanceledError } from "../services/api.client";
import UserService, { User } from "../services/userService";
import userService from "../services/userService";

const UserTable = () => {
  const [users, setUsers] = useState<User[]>([]);

  const [error, setError] = useState("");

  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const { request, cancel } = userService.getAllUsers();
    request
      .then((res) => {
        setLoading(false);
        setUsers(res.data);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });

    // la strict mode esh naka 💀
    // .finally(()=>{
    //   setLoading(false);
    // })

    return () => cancel();
  }, []);

  const deleteUser = (user: User) => {
    const originalUsers = [...users];
    const updatedUsers = users.filter((u) => u.id !== user.id);
    setUsers(updatedUsers);
    userService.deleteUser(user.id).catch((err) => {
      setError(err.message);
      setUsers(originalUsers);
    });
  };

  const addUser = () => {
    const originalUsers = [...users];
    const newUser = { id: 0, name: "Dugi" };
    setUsers([...users, newUser]);
    userService
      .createUser(newUser)
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

    UserService.updateUser(updatedUser).catch((err) => {
      setUsers(originalUsers);
      err.message;
    });
  };

  return (
    <>
      <button className="btn btn-info" onClick={addUser}>
        AddUser
      </button>
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
    </>
  );
};

export default UserTable;

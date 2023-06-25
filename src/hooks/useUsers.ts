import { useState, useEffect } from "react";
import userService, { User } from "../services/userService";
import { CanceledError } from "../services/api.client";

const useUsers = () =>{ 
    const [users, setUsers] = useState<User[]>([]);

  const [error, setError] = useState("");

  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const { request, cancel } = userService.getAll<User>();
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

  return {users, error, isLoading, setError, setUsers};
}

export default useUsers;
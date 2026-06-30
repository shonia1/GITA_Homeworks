import { useEffect, useState } from "react";
import CardComponent from "./components/CardComponent";
import type { IUser } from "./interfaces/IUser";
import axios from "axios";
import "./App.css"

function App() {
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users",
      );
      setUsers(response.data);
    };
    fetchUsers();
  }, []);

  return (
    <>
      <CardComponent users = {users}/>
    </>
  );
}

export default App;

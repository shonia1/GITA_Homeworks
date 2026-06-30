import { useEffect, useState } from "react";
import CardComponent from "./components/CardComponent";
import type { IUser } from "./interfaces/IUser";
import axios from "axios";
import "./App.css";
import SearchBar from "./components/SearchBar";

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

  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = users.filter((user) =>
    user.name.trim().toLowerCase().includes(searchQuery.trim().toLowerCase()),
  );

  return (
    <>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      {filteredUsers.length > 0 ? (
        <CardComponent users={filteredUsers} />
      ) : (
        <p className="user-not-found">მომმარებელი ვერ მოიძებნა !</p>
      )}
    </>
  );
}

export default App;

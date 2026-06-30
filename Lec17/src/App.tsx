import { useEffect, useState } from "react";
import CardComponent from "./components/CardComponent";
import type { IUser } from "./interfaces/IUser";
import axios from "axios";
import "./App.css";
import SearchBar from "./components/SearchBar";

function App() {
  // მომხმარებლების მასივი, სადაც მოგვიანებით შევინახავთ API-დან მიღებულ მონაცემებს
  const [users, setUsers] = useState<IUser[]>([]);

  // კომპონენტის ჩატვირთვის შემდეგ ვიღებთ მომხმარებლებს JSONPlaceholder API-დან
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users",
      );
      setUsers(response.data);
    };
    fetchUsers();
  }, []);

  // საძიებო ტექსტი, რომელიც გამოიყენება მომხმარებლების გაფილტვრისთვის
  const [searchQuery, setSearchQuery] = useState("");

  // მომხმარებლების ფილტრაცია სახელის მიხედვით, რათა მხოლოდ შესაბამისი შედეგები გამოჩნდეს
  const filteredUsers = users.filter((user) =>
    user.name.trim().toLowerCase().includes(searchQuery.trim().toLowerCase()),
  );

  return (
    <>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      {filteredUsers.length > 0 ? (
        <CardComponent users={filteredUsers} />
      ) : (
        <p className="user-not-found">მომხმარებელი ვერ მოიძებნა !</p>
      )}
    </>
  );
}

export default App;

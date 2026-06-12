import "./App.css";
import UserCard from "./Components/Components";
function App() {
  /* ცვლადში ვქმნით ობიექტების არაის */
  let usersList = [
    {
      id: 1,
      name: "Ana",
      age: 21,
      role: "Admin",
      skills: ["HTML", "CSS", "JS"],
      photo:
        "https://fastly.picsum.photos/id/769/200/200.jpg?hmac=M55kAfuYOrcJ8a49hBRDhWtVLbJo88Y76kUz323SqLU",
    },
    {
      id: 2,
      name: "Nika",
      age: 25,
      role: "User",
      skills: ["JS", "React"],
      photo:
        "https://fastly.picsum.photos/id/209/200/200.jpg?hmac=hsby8v-4ueyQ64FWn-Eqn4P9AtOM7OCsjA_L8rxOwHM",
    },
    {
      id: 3,
      name: "Nini",
      age: 23,
      role: "User",
      skills: ["JS", "Node.js"],
      photo:
        "https://fastly.picsum.photos/id/353/200/200.jpg?hmac=0pI-jYBxEC3AHp_0G8YowhiQRtQdv6u1Kfvuf0c9VNQ",
    },
    {
      id: 4,
      name: "Mate",
      age: 28,
      role: "User",
      skills: ["Python", "Django"],
      photo:
        "https://fastly.picsum.photos/id/816/200/200.jpg?hmac=ZNsj0gw4AJtSDA82gMxujRjh3_5ZHoVje8CtZopmcz4",
    },
    {
      id: 5,
      name: "Lika",
      age: 26,
      role: "User",
      skills: ["JS"],
      photo:
        "https://fastly.picsum.photos/id/739/200/200.jpg?hmac=vjkuMOuAEhToH9GIXkmBicl7sUqPZ3k4rRHh6sQJWZ8",
    },
  ];

  return (
    <>
    {/* გადავმაპავთ არაის. */}
      {usersList.map((user) => (
        <UserCard
          key={user.id}
          id={user.id}
          name={user.name}
          age={user.age}
          role={user.role}
          skills={user.skills}
          photo={user.photo}
        />
      ))}
    </>
  );
}
export default App;

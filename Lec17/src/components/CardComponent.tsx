import type { IUser } from "../interfaces/IUser";

interface CardComponentsProps {
  users: IUser[];
}
export default function CardComponent({ users }:CardComponentsProps) {
  return (
    <div className="cards-container">
      {users.map((user: IUser) => (
        <ul className="user-card" key={user.id}>
          <li>
            <strong>Name</strong> {user.name}
          </li>
          <li>
            <strong>Username</strong> {user.username}
          </li>
          <li>
            <strong>Email</strong>{" "}
            <a href={`mailto:${user.email}`}>{user.email}</a>
          </li>
          <li>
            <strong>Phone</strong> {user.phone}
          </li>
          <li>
            <strong>Website</strong>{" "}
            <a
              href={`https://${user.website}`}
              target="_blank"
              rel="noreferrer"
            >
              {user.website}
            </a>
          </li>
          <li>
            <strong>Company Name</strong> {user.company.name}
          </li>
        </ul>
      ))}
    </div>
  );
}

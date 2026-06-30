import type { IUser } from "../interfaces/IUser";

// ეს არის CardComponent-ის props, სადაც გადმოგვცემენ მომხმარებლების სიას
interface CardComponentsProps {
  users: IUser[];
}

// ემოჯიების სია ავატარებისთვის
const avatarEmojis = [
  "🦊", "🦁", "🐯", "🐼", "🐨", "🐻", "🐵", "🐸", 
  "🐱", "🐶", "🐹", "🐰", "🦄", "🦉", "🐙", "🐧",
  "🦖", "🤖", "👽", "👻", "🧙‍♂️", "👩‍🚀", "🕵️‍♂️", "🥷"
];

export default function CardComponent({ users }: CardComponentsProps) {
// ფუნქცია, რომელიც იუზერის ID-ზე დაყრდნობით ყოველთვის ერთსა და იმავე ემოჯის დააბრუნებს
  const getAvatarEmoji = (id:number) => {
    const index = id % avatarEmojis.length;
    return avatarEmojis[index]
  }

  return (
    <div className="cards-container">
      {users.map((user: IUser) => (
        <div className="user-card" key={user.id}>
          <div className="user-card-header">
            {/* ავატარის ახალი კონტეინერი */}
            <div className="user-avatar-wrapper">
              <span className="user-avatar">{getAvatarEmoji(user.id)}</span>
            </div>
            <div className="user-title-info">
              <h3>{user.name}</h3>
              <span className="username">@{user.username}</span>
            </div>
          </div>
          <ul className="user-details-list">
            <li>
              <strong>Email:</strong>{" "}
              <a href={`mailto:${user.email}`}>{user.email}</a>
            </li>
            <li>
              <strong>Phone:</strong> {user.phone}
            </li>
            <li>
              <strong>Website:</strong>{" "}
              <a
                href={`https://${user.website}`}
                target="_blank"
                rel="noreferrer"
              >
                {user.website}
              </a>
            </li>
            <li>
              <strong>Company:</strong> {user.company.name}
            </li>
          </ul>
        </div>
      ))}
    </div>
  );
}

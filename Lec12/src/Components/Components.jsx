import "../App.css";

export default function UserCard(props) {
  return (
    <>
      <div
        className={`user-info ${props.role === "Admin" ? "admin-card" : ""}`}
      >
        <img src={props.photo} alt={`${props.name}'s profile photo`} />
        <p>ID: {props.id}</p>
        <p>Name: {props.name}</p>
        <p>Age: {props.age}</p>
        <p>Role: {props.role}</p>

        <p>Skills:</p>
        <ul>
          {props.skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

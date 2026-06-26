import "./App.css";
import { useEffect, useState } from "react";
import vector from "./assets/Vector.svg";
import circle from "./assets/circle-icon.svg";
import trash from "./assets/trash-icon.svg";
import headerBg from "./assets/header-bg.png";

interface ToDo {
  id: number;
  title: string;
  date: string;
  isComplated: boolean;
}

function App() {
  const [tasks, setTasks] = useState<ToDo[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  //დავალების დამატების ფუნქცია
  const handleAddTask = () => {
    const toDo: ToDo = {
      id: Date.now(),
      title: inputValue,
      date: "Just Now",
      isComplated: false,
    };
    setTasks([...tasks, toDo]);
    setInputValue("");
  };
  //დავალების წაშლის ფუნქცია
  const handleDeleteTask = (id: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  //დავალების სტატუსის შეცვლა
  const handleToggleStatus = (id: number) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, isComplated: !task.isComplated };
      }
      return task;
    });
    setTasks(updatedTasks);
  };
  //მიმდინარე დორის სტეიტი
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    //დროის განახლება ყოველ წამში
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    //ფუნქციის გასუფთავება როცა კომპონენტი დაიხურება
    return () => clearInterval(timer);
  }, []);

  //დროის დორმატირება
  const formattedTime = currentTime.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  //თარიღის ფრმატირება
  const formattedDate = currentTime.toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
  });

  return (
    <div className="app-container">
      <div
        className="app-header"
        style={{ backgroundImage: `url(${headerBg})` }}
      >
        <div className="header-overlay">
          <span className="current-date">{formattedDate}</span>
          <h1 className="current-time">{formattedTime}</h1>
        </div>
      </div>
      <div className="input-section">
        <span>
          <img className="vector-img" src={vector} alt="vector" />
        </span>
        <input
          className="task-input"
          placeholder="Note"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        {/* დამატების ღილაკი */}
        <button
          className="add-btn"
          disabled={inputValue.trim() === ""}
          onClick={handleAddTask}
        >
          +
        </button>
      </div>
      {tasks.map((el) => (
        <div className="task-card" key={el.id}>
          <p>{el.id}</p>
          <p className={`task-title ${el.isComplated ? "complated" : ""}`}>
            {el.title}
          </p>
          <p className="task-date">{el.date}</p>
          <button
            className="delete-button"
            onClick={() => handleDeleteTask(el.id)}
          >
            <img className="trash-icon" src={trash} alt="del" />
          </button>
          <button
            className="status-button"
            onClick={() => handleToggleStatus(el.id)}
          >
            {el.isComplated ? (
              <img className="status-icon" src={vector} alt="completed" />
            ) : (
              <img className="status-icon" src={circle} alt="pending" />
            )}
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;

import "./App.css";
import { useState } from "react";
import vector from "./assets/Vector.svg";
import circle from "./assets/circle-icon.svg";
import trash from "./assets/trash-icon.svg";

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
  return (
    <div className="app-container">
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

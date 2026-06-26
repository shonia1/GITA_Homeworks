import "./App.css";
import { useEffect } from "react";
import headerBg from "./assets/header-bg.png";


import { Header } from "./components/Header";
import { TaskInput } from "./components/TaskInput";
import { TaskItem } from "./components/TaskItem";
import { useToDos } from "./hooks/useToDos";

export default function App() {
  useEffect(() => {
    document.title = "To Do App";
  }, []);

  // ლოგიკის სრული დესტრუქტურიზაცია ჰუკიდან
  const {
    tasks,
    inputValue,
    setInputValue,
    handleAddTask,
    handleDeleteTask,
    handleToggleStatus,
  } = useToDos();

  return (
    <div className="app-container">
      <Header headerBg={headerBg} />
      
      <TaskInput 
        inputValue={inputValue} 
        setInputValue={setInputValue} 
        onAddTask={handleAddTask} 
      />

      {tasks.map((task) => (
        <TaskItem 
          key={task.id} 
          task={task} 
          onToggleStatus={handleToggleStatus} 
          onDeleteTask={handleDeleteTask} 
        />
      ))}
    </div>
  );
}
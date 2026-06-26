import { useState } from "react";
import type { ToDo } from "../types"; 

export function useToDos() {
  const [tasks, setTasks] = useState<ToDo[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  //დავალების დამატების ფუნქცია
  const handleAddTask = () => {
    const now = new Date();
    //დროის ფრმატირება
    const formattedTime = now.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    //თარიღის ფრმატირება
    const formattedDate = now.toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
    });

    const toDo: ToDo = {
      id: Date.now(),
      title: inputValue,
      date: `${formattedDate} at ${formattedTime}`,
      isComplated: false,
    };

    setTasks([toDo, ...tasks]);
    setInputValue("");
  };

  //დავალების წაშლის ფუნქცია
  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  //დავალების სტატუსის შეცვლა
  const handleToggleStatus = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isComplated: !task.isComplated } : task,
      ),
    );
  };

  return {
    tasks,
    inputValue,
    setInputValue,
    handleAddTask,
    handleDeleteTask,
    handleToggleStatus,
  };
}

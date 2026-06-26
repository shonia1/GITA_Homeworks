import { useState } from "react";
import type { ToDo } from "../types";

export function useToDos() {
  // დავალებების მასივის სტეიტი
  const [tasks, setTasks] = useState<ToDo[]>([]);
  // ინპუტის ტექსტის სტეიტი
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

    // ახალი დავალების ობიექტის შექმნა
    const toDo: ToDo = {
      id: Date.now(),
      title: inputValue,
      date: `${formattedDate} at ${formattedTime}`,
      isComplated: false,
    };

    // ახალი ტასკი დაემატება მასივის დასაწყისში
    setTasks([toDo, ...tasks]);
    // ინპუტის ველის გასუფთავება
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

  // ვაბრუნებთ სტეიტებსა და ფუნქციებს კომპონენტებში გამოსაყენებლად
  return {
    tasks,
    inputValue,
    setInputValue,
    handleAddTask,
    handleDeleteTask,
    handleToggleStatus,
  };
}

import "./App.css";
import { useEffect } from "react";
import headerBg from "./assets/header-bg.png";

// კომპონენტებისა და Custom Hook-ის იმპორტი
import { Header } from "./components/Header";
import { TaskInput } from "./components/TaskInput";
import { TaskItem } from "./components/TaskItem";
import { useToDos } from "./hooks/useToDos";

/* აპლიკაციის მთავარი კომპონენტი.
 * აერთიანებს ვიზუალურ კომპონენტებს და აწვდის მათ useToDos ჰუკიდან წამოღებულ ლოგიკას. */
export default function App() {
  // ბრაუზერის ტაბის სათაურის შეცვლა აპლიკაციის ჩატვირთვისას
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
      {/* ჰედერის სექცია რეალური დროით */}
      <Header headerBg={headerBg} />

      {/* ტექსტის შესაყვანი ველი */}
      <TaskInput
        inputValue={inputValue}
        setInputValue={setInputValue}
        onAddTask={handleAddTask}
      />

      {/* დავალებების სიის რენდერინგი */}
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

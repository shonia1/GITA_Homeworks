import vector from "../assets/Vector.svg";
import circle from "../assets/circle-icon.svg";
import trash from "../assets/trash-icon.svg";
import type { ToDo } from "../types";

interface TaskItemProps {
  task: ToDo;
  onToggleStatus: (id: number) => void;
  onDeleteTask: (id: number) => void;
}

//TaskItem კომპონენტი — პასუხისმგებელია ინდივიდუალური დავალების ბარათის ვიზუალზე
export function TaskItem({
  task,
  onToggleStatus,
  onDeleteTask,
}: TaskItemProps) {
  return (
    <div className="task-card">
      {/* დავალების ინფორმაცია, სათაური და შექმნის დრო */}
      <div className="task-info">
        {/* თუ ტასკი შესრულებულია, ემატება ხაზის გადასმის კლასი 'complated' */}
        <p className={`task-title ${task.isComplated ? "complated" : ""}`}>
          {task.title}
        </p>
        <p className="task-date">{task.date}</p>
      </div>
      {/* სტატუსის შესაცვლელი ღილაკი*/}
      <button className="status-button" onClick={() => onToggleStatus(task.id)}>
        {task.isComplated ? (
          <img className="status-button" src={vector} alt="completed" />
        ) : (
          <img className="status-button" src={circle} alt="pending" />
        )}
      </button>
      {/* წაშლის ღილაკი */}
      <button className="delete-button" onClick={() => onDeleteTask(task.id)}>
        <img className="delete-button" src={trash} alt="del" />
      </button>
    </div>
  );
}

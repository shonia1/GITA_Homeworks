import vector from "../assets/Vector.svg";

interface TaskInputProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  onAddTask: () => void;
}

export function TaskInput({ inputValue, setInputValue, onAddTask }: TaskInputProps) {
  return (
    <div className="input-section">
      <span>
        <img className="status-button" src={vector} alt="complete" />
      </span>
      <input
        className="task-input"
        placeholder="Note"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button
        className="add-btn"
        disabled={inputValue.trim() === ""}
        onClick={onAddTask}
      >
        +
      </button>
    </div>
  );
}
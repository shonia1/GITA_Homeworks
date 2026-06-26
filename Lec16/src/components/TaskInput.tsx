import vector from "../assets/Vector.svg";

interface TaskInputProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  onAddTask: () => void;
}

//TaskInput კომპონენტი — მოიცავს ტექსტის შესაყვან ველს და დამატების (+) ღილაკს
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

      {/* ღილაკი გათიშულია თუ ინპუტი ცარიელია ან მხოლოდ სფეისებია ჩაწერილი */}
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
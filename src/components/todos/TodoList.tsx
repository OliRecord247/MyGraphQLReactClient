import type { FC } from "react";
import type { Todo } from "../../types/todo";
import "./TodoList.css";

type Props = {
  todos: Todo[];
  onToggle: (id: string, done: boolean) => void;
  onDelete: (id: string) => void;
};

export const TodoList: FC<Props> = ({ todos, onToggle, onDelete }) => {
  return (
    <ul className="todo-list">
      {todos.map((t) => (
        <li key={t.id} className="todo-item">
          <input
            type="checkbox"
            className="todo-checkbox"
            checked={t.done}
            onChange={() => onToggle(t.id, !t.done)}
          />
          <span className={`todo-text ${t.done ? "done" : ""}`}>{t.text}</span>
          <button className="todo-delete" onClick={() => onDelete(t.id)}>
            🗑️
          </button>
        </li>
      ))}
    </ul>
  );
};

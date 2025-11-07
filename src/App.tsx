import { useState } from "react";
import type { FC } from "react";
import "./App.css";

import { TodoList } from "./components/todos/TodoList";
import { TODOS, useTodos } from "./services/todoService";
import type { Todo } from "./types/todo";

const App: FC = () => {
  const [text, setText] = useState("");

  const { data, loading, error, addTodo, toggleTodo, deleteTodo } = useTodos();

  if (loading) return <p>Loading…</p>;
  if (error) return <p>Error: {error.message}</p>;

  const toggleTodoById = (id: string, done: boolean) => {
    toggleTodo({
      variables: { id: id },
      optimisticResponse: {
        toggleTodo: { id, done },
      },
      update(cache, { data }) {
        if (!data?.toggleTodo) return;
        const existing = cache.readQuery<{ todos: Todo[] }>({ query: TODOS });
        cache.writeQuery({
          query: TODOS,
          data: {
            todos: existing?.todos.map((x) =>
              x.id === id ? { ...x, done: data.toggleTodo.done } : x
            ),
          },
        });
      },
    });
  };

  const deleteTodoById = (id: string) => {
    deleteTodo({
      variables: { id },
    });
  };

  return (
    <main
      style={{ maxWidth: 600, margin: "2rem auto", fontFamily: "system-ui" }}
    >
      <h1>Todos</h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (!text.trim()) return;
          await addTodo({ variables: { text } });
          setText("");
        }}
      >
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="New todo"
        />
        <button type="submit">Add</button>
      </form>

      <TodoList
        todos={data?.todos || []}
        onToggle={toggleTodoById}
        onDelete={deleteTodoById}
      />
    </main>
  );
};

export default App;

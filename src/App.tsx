import { useState } from "react";
import type { FC } from "react";
import "./App.css";

import { TodoList } from "./components/todos/TodoList";
import { TODOS, useTodos } from "./services/todoService";
import type { Todo } from "./types/todo";

const App: FC = () => {
  const [text, setText] = useState("");

  const { data, loading, error, addTodo, toggleTodo, deleteTodo } = useTodos();

  const openTodos = data?.todos.filter((t) => !t.done) || [];
  const closedTodos = data?.todos.filter((t) => t.done) || [];

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
    <main className="todo-app">
      <section className="todo-form-section">
        <h1 className="todo-header">Add Task</h1>
        <form
          className="todo-form"
          onSubmit={async (e) => {
            e.preventDefault();
            if (!text.trim()) return;
            await addTodo({ variables: { text } });
            setText("");
          }}
        >
          <input
            className="todo-input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What needs to be done?"
          />
          <button className="todo-submit" type="submit">
            Add Todo
          </button>
        </form>
      </section>

      <section className="todo-list-section">
        <h1 className="todo-header">Open Tasks</h1>
        <TodoList
          todos={openTodos}
          onToggle={toggleTodoById}
          onDelete={deleteTodoById}
        />
      </section>

      <section className="todo-list-section">
        <h1 className="todo-header">Closed Tasks</h1>
        <TodoList
          todos={closedTodos}
          onToggle={toggleTodoById}
          onDelete={deleteTodoById}
        />
      </section>
    </main>
  );
};

export default App;

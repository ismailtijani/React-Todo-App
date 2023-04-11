import "./App.scss";
import CompletedTodos from "./components/completed-todos";
import TodoInput from "./components/todo-input";
import React from "react";
import { useTodoContext } from "./context/todo.context";
import TodoList from "./components/todo-list.component";

function App() {
  const { completedTodos } = useTodoContext();

  return (
    <div className="app">
      <div className="task-container">
        <div className="task-container-header">
          <TodoInput />
        </div>
        <TodoList />
        {completedTodos.length !== 0 && <CompletedTodos />}
      </div>
    </div>
  );
}

export default App;

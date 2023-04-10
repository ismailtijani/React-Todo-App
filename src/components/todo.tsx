import { BsCircle } from "react-icons/bs";
import { ITodo } from "../interface";
import React, { useState } from "react";
import { useTodoContext } from "../context/todo.context";
import SetDueDate from "./set-due-date";
import HoverIcons from "./hover-icons";

const Todo = ({ todo }: { todo: ITodo }) => {
  const [title, setTitle] = useState("");
  const [edit, setEdit] = useState<string | boolean>(false);
  const { updateTodo, markTodoAsCompleted } = useTodoContext();

  const handleEditChange = (id: string, text: string) => {
    setEdit(id);
    setTitle(text);
  };

  return (
    <div className="task">
      <div className="left">
        <span onClick={() => markTodoAsCompleted(todo.id)}>
          <BsCircle className="circle-icon" />
        </span>
        <div className="task-text">
          {edit === todo.id ? (
            <input
              type="text"
              className="edit-todo-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          ) : (
            <h4>{todo.title}</h4>
          )}
          {edit === todo.id ? "" : <SetDueDate todo={todo} />}
        </div>
      </div>
      {edit === todo.id ? (
        <div>
          <button
            onClick={() => {
              updateTodo(todo.id, title);
              setTitle("");
              setEdit(false);
            }}
          >
            Edit todo
          </button>
          <button
            onClick={() => {
              setEdit(false);
              setTitle("");
            }}
          >
            Cancel Edit
          </button>
        </div>
      ) : (
        <HoverIcons todo={todo} handleEditChange={handleEditChange} />
      )}
    </div>
  );
};

export default Todo;
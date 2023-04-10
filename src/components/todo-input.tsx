import React, { useState } from "react";
import { BsPlusCircleFill } from "react-icons/bs";
import { useTodoContext } from "../context/todo.context";

const TodoInput = () => {
  const { addTodo } = useTodoContext();
  const [title, setTitle] = useState("");

  return (
    <div className="task-container-heading">
      <span
        onClick={() => {
          addTodo(title);
          setTitle("");
        }}
      >
        <BsPlusCircleFill className="add-icon" />
      </span>
      <input
        type="text"
        placeholder="Add a task"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
    </div>
  );
};

export default TodoInput;

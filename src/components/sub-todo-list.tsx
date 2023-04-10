import { BsCircle } from "react-icons/bs";
import { AiFillCheckCircle } from "react-icons/ai";
import { ISubTodoProps } from "../interface";
import React from "react";
import { useTodoContext } from "../context/todo.context";

const SubTodoList: React.FC<ISubTodoProps> = ({
  todo,
  todoIndex,
  subTodoIndex,
  subTodo,
}) => {
  const { markSubTodoAsCompleted, isSubTodoListOpen } = useTodoContext();

  return (
    <div
      className={String(isSubTodoListOpen) === todo.id ? "sub-todo" : "none"}
    >
      <div className="sub-todo-content">
        <span
          onClick={() =>
            markSubTodoAsCompleted(todo.id, todoIndex, subTodoIndex)
          }
        >
          {subTodo.completed ? (
            <AiFillCheckCircle className="circle-icon" />
          ) : (
            <BsCircle className="circle-icon" />
          )}
        </span>
        <div className="task-text">
          <h4>{subTodo.title}</h4>
        </div>
      </div>
    </div>
  );
};

export default SubTodoList;

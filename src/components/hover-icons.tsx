import React from "react";
import { BiChevronUp, BiChevronDown } from "react-icons/bi";
import { MdAdd, MdEdit, MdDelete } from "react-icons/md";
import { useTodoContext } from "../context/todo.context";
import { ITodo } from "../interface";

const HoverIcons = ({
  todo,
  handleEditChange,
}: {
  todo: ITodo;
  handleEditChange: (id: string, text: string) => void;
}) => {
  const {
    removeTodo,
    setIsSubTodoInputOpen,
    isSubTodoInputOpen,
    isSubTodoListOpen,
    setIsSubTodoListOpen,
  } = useTodoContext();

  return (
    <div className="todo-icons">
      {!isSubTodoInputOpen && (
        <div className="todo-icons-inner">
          <span onClick={() => setIsSubTodoInputOpen(todo.id)}>
            <MdAdd />
          </span>
          <span onClick={() => handleEditChange(todo.id, todo.title)}>
            <MdEdit />
          </span>
          <span onClick={() => removeTodo(todo.id)}>
            <MdDelete />
          </span>
        </div>
      )}
      {String(isSubTodoListOpen) === todo.id ? (
        <span className="arrow" onClick={() => setIsSubTodoListOpen(false)}>
          <BiChevronUp />
        </span>
      ) : (
        <span
          className="arrow"
          onClick={() => {
            if (todo.subTodos.length === 0) alert("Add a sub todo");
            setIsSubTodoListOpen(todo.id);
          }}
        >
          <BiChevronDown />
        </span>
      )}
    </div>
  );
};

export default HoverIcons;

import { MdOutlineCountertops } from "react-icons/md";
import { getRelativeDate } from "../utils/helper.utils";
import { ITodo } from "../interface";
import { useTodoContext } from "../context/todo.context";
import moment from "moment";
import React from "react";

const SetDueDate = ({ todo }: { todo: ITodo }) => {
  const { setDueDate } = useTodoContext();

  return (
    <div className="down">
      {todo.subTodos.length === 0 ? null : (
        <span className="sub-task-count">
          <MdOutlineCountertops />
          &nbsp;
          {todo.subTodos.filter((t) => t.completed).length}/
          {todo.subTodos.length}
        </span>
      )}
      <span className="due-date">
        <input
          type="date"
          placeholder=""
          onChange={(event) => {
            if (!moment(event.target.value).isBefore(moment(), "day")) {
              setDueDate(todo.id, event.target.value);
            } else {
              alert("You can pick a day that has passed");
            }
          }}
          required
        />
        {todo.dueDate === undefined
          ? "No due date"
          : getRelativeDate(todo.dueDate).toLocaleUpperCase()}
      </span>
    </div>
  );
};

export default SetDueDate;

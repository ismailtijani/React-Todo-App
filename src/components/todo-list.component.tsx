import { useState } from "react";
import Todo from "../components/todo";
import SubTodoList from "../components/sub-todo-list";
import { BsPlusCircleFill } from "react-icons/bs";
import React from "react";
import { useTodoContext } from "../context/todo.context";

const TodoList = () => {
  const [subTask, setSubTask] = useState("");

  const {
    unCompletedTodos,
    addSubTodo,
    isSubTodoInputOpen,
    setIsSubTodoInputOpen,
  } = useTodoContext();

  return (
    <div className="all-tasks">
      <h3>Task - {unCompletedTodos.length}</h3>

      <div className="tasks">
        {unCompletedTodos.map((todo, index: number) => (
          <div key={todo.id}>
            <Todo todo={todo} />

            {String(isSubTodoInputOpen) === todo.id && (
              <div className="add-sub-task">
                <div className="add-sub-task-inner">
                  <span>
                    <BsPlusCircleFill className="add-icon" />
                  </span>
                  <input
                    type="text"
                    placeholder="Add sub-task"
                    onChange={(e) => setSubTask(e.target.value)}
                    value={subTask}
                  />
                </div>

                <div className="add-sub-task-inner">
                  <button
                    className="edit-button"
                    onClick={() => {
                      addSubTodo(subTask, todo.id);
                      setSubTask("");
                      setIsSubTodoInputOpen(false);
                    }}
                  >
                    Add Sub Todo
                  </button>
                  <button
                    className="edit-button"
                    onClick={() => setIsSubTodoInputOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {todo.subTodos &&
              todo.subTodos.map((subTodo: any, subTodoIndex: any) => (
                <SubTodoList
                  key={subTodo.id}
                  todo={todo}
                  subTodo={subTodo}
                  todoIndex={index}
                  subTodoIndex={subTodoIndex}
                />
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;

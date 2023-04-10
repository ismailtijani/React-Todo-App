import baseUrl from "../contsnt";
import { ITodo, ISubTodo } from "../interface";
import { v4 as uuidv4 } from "uuid";

export const add = async (todos: ITodo[], title: string) => {
  if (title === "") {
    alert("Empty input, pls add a todo");
    return;
  }
  const newTodo = {
    id: uuidv4() as string,
    title,
    completed: false,
    dueDate: new Date(),
    subTodos: [] as ISubTodo[],
  };

  await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTodo),
  });

  return [...todos, newTodo];
};

export const update = async (id: string, text: string) => {
  await fetch(`${baseUrl}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: text,
    }),
  });
};

export const remove = async (id: string) =>
  await fetch(`${baseUrl}/${id}`, {
    method: "DELETE",
  });

const updates = async (id: string) =>
  await fetch(`${baseUrl}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      completed: true,
    }),
  });

export const markTodoAsComplete = async (todos: ITodo[], id: string) => {
  const newTodo = [...todos];

  const subTodo = newTodo.find((t) => t.id === id) as ITodo;

  const completedSubTodos = subTodo?.subTodos.every(
    (subTodo: { completed: any }) => subTodo.completed
  );

  if (subTodo?.subTodos.length === 0) {
    updates(id);
    return;
  } else if (subTodo.subTodos.length > 0) {
    if (completedSubTodos) {
      updates(id);
    } else {
      alert("Complete all sub task");
      return;
    }
  }
};

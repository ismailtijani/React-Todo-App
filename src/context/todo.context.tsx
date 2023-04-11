import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import baseUrl from "../constant";
import { ITodo, ISubTodo } from "../interface";
import { v4 as uuidv4 } from "uuid";

const get = async () => {
  const res = await fetch(baseUrl);
  const data: ITodo[] = await res.json();
  return data;
};

const add = async (todos: ITodo[], title: string) => {
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

const addSub = async (todos: ITodo[], subTask: string, id: string) => {
  if (subTask === "") {
    alert("Empty input, pls add a sub todo/task");
    return;
  }

  const newTodo = [...todos];

  const subTodo = newTodo.find((t) => t.id === id)?.subTodos as ISubTodo[];

  const newSubTodo = {
    id: uuidv4(),
    title: subTask,
    completed: false,
  };

  const subTodos = [...subTodo, newSubTodo];

  await fetch(`${baseUrl}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ subTodos }),
  });
};

const updateCompleted = async (id: string) =>
  await fetch(`${baseUrl}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      completed: true,
    }),
  });

const markTodo = async (todos: ITodo[], id: string) => {
  const newTodo = [...todos];

  const subTodo = newTodo.find((t) => t.id === id) as ITodo;

  const completedSubTodos = subTodo?.subTodos.every(
    (subTodo: { completed: any }) => subTodo.completed
  );

  if (subTodo?.subTodos.length === 0) {
    await updateCompleted(id);
    return;
  } else if (subTodo.subTodos.length > 0) {
    if (completedSubTodos) {
      await updateCompleted(id);
    } else {
      alert("Complete all sub task");
      return;
    }
  }
};

const markSubTodo = async (
  todos: ITodo[],
  todoId: string,
  todoIndex: number,
  subTodoIndex: number
) => {
  const newTodo = [...todos];
  let subTodos = newTodo.find((t) => t.id === todoId)?.subTodos as ISubTodo[];
  subTodos[subTodoIndex].completed = true;
  newTodo[todoIndex].subTodos = subTodos;

  await fetch(`${baseUrl}/${todoId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      subTodos,
    }),
  }).then();
};

const setDate = async (id: string, date: string) => {
  await fetch(`${baseUrl}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      dueDate: date,
    }),
  });
};

const update = async (id: string, text: string) => {
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

const remove = async (id: string) => {
  await fetch(`${baseUrl}/${id}`, {
    method: "DELETE",
  });
};

const TODO_ACTION_TYPES = {
  SET_TODOS: "SET_TODOS",
  SET_COMPLETED_TODOS: "SET_COMPLETED_TODOS",
  SET_UNCOMPLETED_TODOS: "SET_UNCOMPLETED_TODOS",
};

const INITIAL_STATE = {
  todos: [],
  completedTodos: [],
  unCompletedTodos: [],
  isSubTodoInputOpen: false,
  isSubTodoListOpen: false,
};

const todoReducer = (state: any, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case TODO_ACTION_TYPES.SET_TODOS:
      return {
        ...state,
        ...payload,
      };
    default:
      throw new Error(`Unhandled type ${type} in cartReducer`);
  }
};

export const TodoContext = createContext({
  todos: [] as ITodo[],
  completedTodos: [] as ITodo[],
  unCompletedTodos: [] as ITodo[],
  isSubTodoInputOpen: false,
  setIsSubTodoInputOpen: (arg: string | boolean) => {},
  isSubTodoListOpen: false,
  setIsSubTodoListOpen: (arg: string | boolean) => {},
  getTodos: () => {},
  addTodo: (title: string) => {},
  addSubTodo: (subTask: string, id: string) => {},
  markTodoAsCompleted: (id: string) => {},
  markSubTodoAsCompleted: (
    todoId: string,
    todoIndex: number,
    subTodoIndex: number
  ) => {},
  setDueDate: (id: string, title: string) => {},
  updateTodo: (id: string, title: string) => {},
  removeTodo: (id: string) => {},
});

export const TodoProvider = ({ children }: { children: any }) => {
  const [isSubTodoInputOpen, setIsSubTodoInputOpen] = useState(false);
  const [isSubTodoListOpen, setIsSubTodoListOpen] = useState(false);

  const [{ todos, completedTodos, unCompletedTodos }, dispatch] = useReducer(
    todoReducer,
    INITIAL_STATE
  );

  useEffect(() => {
    getTodos();
  });

  const updatedTodoReducer = async () => {
    const todos = await get();

    const completedTodos = todos.filter(
      (todo: { completed: boolean }) => todo.completed === true
    );

    const unCompletedTodos = todos.filter(
      (todo: { completed: boolean }) => todo.completed === false
    );

    const payload = {
      todos,
      completedTodos,
      unCompletedTodos,
    };

    dispatch({ type: TODO_ACTION_TYPES.SET_TODOS, payload });
  };

  const getTodos = async () => {
    updatedTodoReducer();
  };

  const addTodo = async (title: string) => {
    await add(todos, title);
    updatedTodoReducer();
  };

  const addSubTodo = async (subTask: string, id: string) => {
    await addSub(todos, subTask, id);
    updatedTodoReducer();
  };

  const markTodoAsCompleted = async (id: string) => {
    await markTodo(todos, id);
    updatedTodoReducer();
  };

  const markSubTodoAsCompleted = async (
    todoId: string,
    todoIndex: number,
    subTodoIndex: number
  ) => {
    await markSubTodo(todos, todoId, todoIndex, subTodoIndex);
    updatedTodoReducer();
  };

  const setDueDate = async (id: string, date: string) => {
    await setDate(id, date);
    updatedTodoReducer();
  };

  const updateTodo = async (id: string, text: string) => {
    await update(id, text);
    updatedTodoReducer();
  };

  const removeTodo = async (id: string) => {
    await remove(id);
    updatedTodoReducer();
  };

  const value: any = {
    todos,
    completedTodos,
    unCompletedTodos,
    getTodos,
    addTodo,
    addSubTodo,
    updateTodo,
    removeTodo,
    markTodoAsCompleted,
    markSubTodoAsCompleted,
    setDueDate,
    isSubTodoInputOpen,
    setIsSubTodoInputOpen,
    isSubTodoListOpen,
    setIsSubTodoListOpen,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export const useTodoContext = () => useContext(TodoContext);

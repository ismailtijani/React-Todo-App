import { MouseEventHandler } from "react";

export interface ISubTodo {
  id: string;
  title: string;
  completed: boolean;
}

export interface ITodo {
  id: string;
  title: string;
  completed: boolean;
  dueDate: Date;
  subTodos: ISubTodo[];
}

export interface ITodoListProps {
  title: string;
  setTitle: (arg: string) => void;
}

export interface ITodoProps {
  todo: ITodo;
  // title: string;
  // setTitle: (arg: string) => void;
  edit: string | boolean;
  setEdit: (arg: string | boolean) => void;
  showSubtodo: string | boolean;
  setShowSubtodo: (arg: string | boolean) => void;
  // removeTodo: (arg: string) => void;
  // markTodoAsComplete: (arg: string) => void;
  // updateTodo: (arg1: string, arg2: string) => void;
  // handleEditChange: (arg1: string, arg2: string) => void;
  subTaskInput: string | boolean;
  setSubTaskInput: (arg: string | boolean) => void;
  setDueDate: (arg1: string, arg2: string) => void;
}

export interface ITodoInputProps {
  title: string;
  setTitle: (arg: string) => void;
  // addTodo: (title: string) => void;
}

export interface ISubTodoProps {
  todo: ITodo;
  todoIndex: number;
  subTodoIndex: number;
  subTodo: ISubTodo;
  // markSubTodoAsComplete: (arg1: string, arg2: number, arg3: number) => void;
}

export interface ICompleteTodosProps {
  completedTodos: ITodo[];
}

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

export interface ISubTodoProps {
  todo: ITodo;
  todoIndex: number;
  subTodoIndex: number;
  subTodo: ISubTodo;
}

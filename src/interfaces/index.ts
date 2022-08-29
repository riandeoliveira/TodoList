import type { Dispatch, SetStateAction } from "react";
import type { FilterType } from "types";

export interface ITodo {
  id: string;
  name: string;
  description: string;
  completed: boolean;
}

export interface ITodoContext {
  todoList: ITodo[];
  filterType: FilterType;

  setTodoList: Dispatch<SetStateAction<ITodo[]>>;
  addTodo: (name: string, description: string) => void;
  completeTodo: (id: string) => void;
  renameTodo: (id: string) => void;
  removeTodo: (id: string) => void;

  filterByType: (type: FilterType) => void;
}

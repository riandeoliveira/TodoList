import type { Dispatch, RefObject, SetStateAction } from "react";
import type { FilterType } from "types";

export interface ITodo {
  id: string;
  name: string;
  description: string;
  completed: boolean;
}

export interface ITodoContext {
  todoList: ITodo[];

  editTodoName: string;
  editTodoDescription: string;
  todoId: string;

  filterType: FilterType;

  modalIsOpen: boolean;

  todoNameElement: RefObject<HTMLInputElement>;

  setTodoList: Dispatch<SetStateAction<ITodo[]>>;
  setEditTodoName: Dispatch<SetStateAction<string>>;
  setEditTodoDescription: Dispatch<SetStateAction<string>>;
  setTodoId: Dispatch<SetStateAction<string>>;

  addTodo: (name: string, description: string) => void;
  completeTodo: (id: string) => void;
  renameTodo: (id: string) => void;
  removeTodo: (id: string) => void;

  filterByType: (type: FilterType) => void;

  handleOpenModal: () => void;
  handleCloseModal: () => void;
}

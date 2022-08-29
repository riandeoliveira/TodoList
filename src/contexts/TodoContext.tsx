import type { ITodo, ITodoContext } from "interfaces";
import { createContext, useState } from "react";
import type { FilterType } from "types";
import { uid } from "uid";

interface TodoProviderProps {
  children: JSX.Element;
}

export const TodoContext = createContext<ITodoContext | null>(null);

export const TodoProvider = ({ children }: TodoProviderProps) => {
  const [todoList, setTodoList] = useState<ITodo[]>([]);
  const [filterType, setFilterType] = useState<FilterType>("all");

  const addTodo = (name: string, description: string): void => {
    const newTodo: ITodo = {
      id: uid(),
      name,
      description,
      completed: false,
    };

    setTodoList([...todoList, newTodo]);

    localStorage.setItem("todos", JSON.stringify([...todoList, newTodo]));
  };

  const completeTodo = (id: string) => {
    const list: ITodo[] = todoList.map((todo) => {
      if (todo.id === id) {
        const updatedTodo: ITodo = {
          ...todo,
          completed: !todo.completed,
        };

        return updatedTodo;
      }

      return todo;
    });

    setTodoList(list);

    localStorage.setItem("todos", JSON.stringify(list));
  };

  const renameTodo = (id: string): void => {
    console.log("");
  };

  const removeTodo = (id: string) => {
    const list: ITodo[] = todoList.filter((todo) => todo.id !== id);

    setTodoList(list);

    localStorage.setItem("todos", JSON.stringify([...list]));
  };

  const filterByType = (type: FilterType) => setFilterType(type);

  const data: ITodoContext = {
    todoList,
    filterType,
    setTodoList,
    addTodo,
    completeTodo,
    renameTodo,
    removeTodo,
    filterByType,
  };

  return <TodoContext.Provider value={data}>{children}</TodoContext.Provider>;
};

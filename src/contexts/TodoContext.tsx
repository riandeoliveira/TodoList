import type { ITodo, ITodoContext } from "interfaces";
import { createContext, useRef, useState, type RefObject } from "react";
import type { FilterType } from "types";
import { uid } from "uid";

interface TodoProviderProps {
  children: JSX.Element;
}

export const TodoContext = createContext<ITodoContext | null>(null);

export const TodoProvider = ({ children }: TodoProviderProps) => {
  const [todoList, setTodoList] = useState<ITodo[]>([]);

  const [editTodoName, setEditTodoName] = useState<string>("");
  const [editTodoDescription, setEditTodoDescription] = useState<string>("");

  const [todoId, setTodoId] = useState<string>("");

  const [filterType, setFilterType] = useState<FilterType>("all");

  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const todoNameElement: RefObject<HTMLInputElement> =
    useRef<HTMLInputElement>(null);

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

  const handleOpenModal = (): void => setModalIsOpen(true);
  const handleCloseModal = (): void => setModalIsOpen(false);

  const renameTodo = (id: string): void => {
    if (todoNameElement.current?.value.trim().length === 0) {
      alert("Insira um nome para sua tarefa!");
    } else {
      const list: ITodo[] = todoList.map((todo) => {
        if (todo.id === id) {
          const renamedTodo: ITodo = {
            ...todo,
            name: editTodoName,
            description: editTodoDescription,
          };

          return renamedTodo;
        }

        return todo;
      });

      setEditTodoName("");
      setEditTodoDescription("");

      setTodoList(list);

      localStorage.setItem("todos", JSON.stringify(list));

      handleCloseModal();
    }
  };

  const removeTodo = (id: string) => {
    const list: ITodo[] = todoList.filter((todo) => todo.id !== id);

    setTodoList(list);

    localStorage.setItem("todos", JSON.stringify([...list]));
  };

  const filterByType = (type: FilterType) => setFilterType(type);

  const data: ITodoContext = {
    todoList,
    editTodoName,
    editTodoDescription,
    todoId,
    filterType,
    modalIsOpen,
    todoNameElement,
    setTodoList,
    setEditTodoName,
    setEditTodoDescription,
    setTodoId,
    addTodo,
    completeTodo,
    renameTodo,
    removeTodo,
    filterByType,
    handleOpenModal,
    handleCloseModal,
  };

  return <TodoContext.Provider value={data}>{children}</TodoContext.Provider>;
};

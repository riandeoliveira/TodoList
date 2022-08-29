import type { ITodo, ITodoContext } from "interfaces";
import { createContext, useRef, useState, type RefObject } from "react";
import type { FilterType } from "types";
import { uid } from "uid";

interface TodoProviderProps {
  children: JSX.Element;
}

export const TodoContext = createContext<ITodoContext | null>(null);

export const TodoProvider = ({ children }: TodoProviderProps) => {
  // Armazena a lista de tarefas, um vetor de objetos.
  const [todoList, setTodoList] = useState<ITodo[]>([]);

  // Armazena os dados do modal para a edição de uma tarefa.
  const [editTodoName, setEditTodoName] = useState<string>("");
  const [editTodoDescription, setEditTodoDescription] = useState<string>("");

  // Armazena o ID de uma tarefa selecionada.
  const [todoId, setTodoId] = useState<string>("");

  // Armazena os tipos de filtro de tarefas, eles podem ser: todas / concluídas / pendentes.
  const [filterType, setFilterType] = useState<FilterType>("all");

  // Armazena o status do modal, se está aberto ou fechado.
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  // Armazena uma referência da entrada de nome da tarefa.
  const todoNameElement: RefObject<HTMLInputElement> =
    useRef<HTMLInputElement>(null);

  // Adiciona uma nova tarefa, recebendo o nome e descrição como argumentos.
  const addTodo = (name: string, description: string): void => {
    // Objeto contendo uma nova tarefa e um ID único.
    const newTodo: ITodo = {
      id: uid(),
      name,
      description,
      completed: false,
    };

    setTodoList([...todoList, newTodo]);

    localStorage.setItem("todos", JSON.stringify([...todoList, newTodo]));
  };

  // Concluí uma tarefa, recebendo o ID da que foi selecionada.
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

  // Funções para abrir e fechar o modal.
  const handleOpenModal = (): void => setModalIsOpen(true);
  const handleCloseModal = (): void => setModalIsOpen(false);

  // Renomeia uma tarefa, recebendo o ID da que foi selecionada.
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

  // Remove uma tarefa, recebendo o ID da que foi selecionada.
  const removeTodo = (id: string) => {
    const list: ITodo[] = todoList.filter((todo) => todo.id !== id);

    setTodoList(list);

    localStorage.setItem("todos", JSON.stringify([...list]));
  };

  // Seta um tipo de filtro no estado que os armazena.
  const filterByType = (type: FilterType) => setFilterType(type);

  // Objeto para ser exportado como contexto global.
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

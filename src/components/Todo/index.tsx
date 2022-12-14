import { TodoContext } from "contexts/TodoContext";
import type { ITodo, ITodoContext } from "interfaces";
import { FiEdit, FiInfo, HiOutlineTrash } from "libs/react-icons";
import { useRouter, type NextRouter } from "next/router";
import { useContext } from "react";
import styles from "./styles.module.scss";

interface TodoProps extends Omit<ITodo, "description"> {}

export const Todo = ({ id, name, completed }: TodoProps): JSX.Element => {
  const { completeTodo, removeTodo, handleOpenModal, setTodoId } = useContext(
    TodoContext
  ) as ITodoContext;

  // constante para o roteamento das páginas em: /todos/[id].
  const router: NextRouter = useRouter();

  return (
    <>
      <div
        className={`${styles.todo_container} ${
          completed ? styles.completed : ""
        }`}
      >
        <div
          className={styles.todo}
          tabIndex={0}
          onClick={() => completeTodo(id)}
        >
          <span className={styles.name}>{name}</span>
        </div>
        <div className={styles.option_container}>
          <button
            type="button"
            title="Abrir tarefa"
            className={styles.button}
            onClick={() => router.push(`/todos/${id}`)}
          >
            <FiInfo size={22} className={styles.icon} />
          </button>
          <button
            type="button"
            title="Editar tarefa"
            className={styles.button}
            onClick={() => {
              // Quando o botão de editar é clicado um modal é aberto e o id da tarefa selecionada é armazenado para ser utilizado dentro do modal.

              setTodoId(id);

              handleOpenModal();
            }}
          >
            <FiEdit size={22} className={styles.icon} />
          </button>
          <button
            type="button"
            title="Remover tarefa"
            className={styles.button}
            onClick={() => removeTodo(id)}
          >
            <HiOutlineTrash size={22} className={styles.icon} />
          </button>
        </div>
      </div>
    </>
  );
};

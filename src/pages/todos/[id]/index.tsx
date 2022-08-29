import { Header } from "components/Header";
import { TodoContext } from "contexts/TodoContext";
import type { ITodo, ITodoContext } from "interfaces";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import styles from "./styles.module.scss";

const Todos: NextPage = (): JSX.Element => {
  const { setTodoList, todoList } = useContext(TodoContext) as ITodoContext;

  const { query } = useRouter();

  let currentTodo: ITodo = {
    id: "",
    name: "",
    description: "",
    completed: false,
  };

  // Ao montar o componente, busca todas as tarefas no Local Storage e armazena no estado 'TodoList'.
  useEffect(() => {
    const storageTodos: ITodo[] = JSON.parse(
      localStorage.getItem("todos") || "[]"
    );

    setTodoList(storageTodos);
  }, []);

  // Faz uma busca nas tarefas para encontrar aquela que possui o ID passado na URL.
  todoList.find((todo) => {
    if (todo.id === query.id) {
      currentTodo = todo;
    }
  });

  return (
    <div className={styles.layout}>
      <div className={styles.container}>
        <Header />
        <section className={styles.section}>
          <h2 className={styles.title}>
            {currentTodo.name === ""
              ? "Nenhuma tarefa encontrada"
              : currentTodo.name}
          </h2>
          <p className={styles.description}>{currentTodo.description}</p>
        </section>
      </div>
    </div>
  );
};

export default Todos;

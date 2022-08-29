import { Header } from "components/Header";
import { TodoForm } from "components/TodoForm";
import { TodoList } from "components/TodoList";
import { TodoModal } from "components/TodoModal";
import { TodoContext } from "contexts/TodoContext";
import type { ITodo, ITodoContext } from "interfaces";
import type { NextPage } from "next";
import { useContext, useEffect } from "react";
import styles from "./styles.module.scss";

const Home: NextPage = (): JSX.Element => {
  const { setTodoList } = useContext(TodoContext) as ITodoContext;

  // Ao montar o componente, busca todas as tarefas no Local Storage e armazena no estado 'TodoList'.
  useEffect(() => {
    const storageTodos: ITodo[] = JSON.parse(
      localStorage.getItem("todos") || "[]"
    );

    setTodoList(storageTodos);
  }, []);

  return (
    <div className={styles.layout}>
      <div className={styles.container}>
        <Header />
        <TodoForm />
        <TodoList />
        <TodoModal />
      </div>
    </div>
  );
};

export default Home;

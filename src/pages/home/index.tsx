import { Header } from "components/Header";
import { TodoForm } from "components/TodoForm";
import { TodoList } from "components/TodoList";
import { TodoContext } from "contexts/TodoContext";
import type { ITodo, ITodoContext } from "interfaces";
import type { NextPage } from "next";
import { useContext, useEffect } from "react";
import styles from "./styles.module.scss";

const Home: NextPage = (): JSX.Element => {
  const { setTodoList } = useContext(TodoContext) as ITodoContext;

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
      </div>
    </div>
  );
};

export default Home;

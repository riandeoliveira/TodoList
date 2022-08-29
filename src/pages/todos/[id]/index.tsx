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

  useEffect(() => {
    const storageTodos: ITodo[] = JSON.parse(
      localStorage.getItem("todos") || "[]"
    );

    setTodoList(storageTodos);
  }, []);

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
          <h2>{currentTodo.name}</h2>
          <div>{currentTodo.description}</div>
        </section>
      </div>
    </div>
  );
};

export default Todos;

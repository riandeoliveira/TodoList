import { Todo } from "components/Todo";
import { TodoContext } from "contexts/TodoContext";
import type { ITodoContext } from "interfaces";
import { useContext } from "react";
import styles from "./styles.module.scss";

export const TodoList = (): JSX.Element => {
  const { todoList, filterByType, filterType } = useContext(
    TodoContext
  ) as ITodoContext;

  const allTodos: number = todoList.length;
  const completedTodos: number = todoList.filter(
    (todo) => todo.completed === true
  ).length;
  const pendingTodos: number = todoList.filter(
    (todo) => todo.completed === false
  ).length;

  return (
    <main className={styles.main}>
      <div className={styles.heading}>
        <h2>Suas tarefas</h2>
        <div className={styles.filters}>
          <button
            type="button"
            className={`${styles.button} ${styles.enabled}`}
            onClick={() => filterByType("all")}
          >
            Todas: {allTodos}
          </button>
          <button
            type="button"
            className={`${styles.button} ${styles.disabled}`}
            onClick={() => filterByType("completed")}
          >
            Concluídas: {completedTodos}
          </button>
          <button
            type="button"
            className={`${styles.button} ${styles.disabled}`}
            onClick={() => filterByType("pending")}
          >
            Pendentes: {pendingTodos}
          </button>
        </div>
      </div>
      <div className={styles.todo_list}>
        {filterType === "all" &&
          todoList.map(({ id, name, completed }, i) => (
            <Todo id={id} name={name} completed={completed} key={i} />
          ))}
        {filterType === "completed" &&
          todoList.map(({ id, name, completed }, i) => {
            if (completed) {
              return <Todo id={id} name={name} completed={completed} key={i} />;
            }
          })}
        {filterType === "pending" &&
          todoList.map(({ id, name, completed }, i) => {
            if (!completed) {
              return <Todo id={id} name={name} completed={completed} key={i} />;
            }
          })}
      </div>
    </main>
  );
};

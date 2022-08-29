import { Todo } from "components/Todo";
import { TodoContext } from "contexts/TodoContext";
import type { ITodoContext } from "interfaces";
import { useContext } from "react";
import styles from "./styles.module.scss";

export const TodoList = (): JSX.Element => {
  const { todoList, filterByType, filterType } = useContext(
    TodoContext
  ) as ITodoContext;

  // Quantidade total de tarefas.
  const allTodos: number = todoList.length;

  // Quantidade de tarefas concluídas.
  const completedTodos: number = todoList.filter(
    (todo) => todo.completed === true
  ).length;

  // Quantidade de tarefas pendentes.
  const pendingTodos: number = todoList.filter(
    (todo) => todo.completed === false
  ).length;

  return (
    <main className={styles.main}>
      <div className={styles.heading}>
        <h2 className={styles.title}>Suas tarefas</h2>
        <div className={styles.filters}>
          <button
            type="button"
            className={`${styles.button} ${
              filterType === "all" ? styles.enabled : styles.disabled
            }`}
            onClick={() => filterByType("all")}
          >
            Todas: {allTodos}
          </button>
          <button
            type="button"
            className={`${styles.button} ${
              filterType === "completed" ? styles.enabled : styles.disabled
            }`}
            onClick={() => filterByType("completed")}
          >
            Concluídas: {completedTodos}
          </button>
          <button
            type="button"
            className={`${styles.button} ${
              filterType === "pending" ? styles.enabled : styles.disabled
            }`}
            onClick={() => filterByType("pending")}
          >
            Pendentes: {pendingTodos}
          </button>
        </div>
      </div>
      <div className={styles.todo_list}>
        {/* Renderiza todas as tarefas existentes. */}
        {filterType === "all" &&
          todoList.map(({ id, name, completed }, i) => (
            <Todo id={id} name={name} completed={completed} key={i} />
          ))}

        {/* Renderiza todas as tarefas concluídas. */}
        {filterType === "completed" &&
          todoList.map(({ id, name, completed }, i) => {
            if (completed) {
              return <Todo id={id} name={name} completed={completed} key={i} />;
            }

            return "";
          })}

        {/* Renderiza todas as tarefas pendentes. */}
        {filterType === "pending" &&
          todoList.map(({ id, name, completed }, i) => {
            if (!completed) {
              return <Todo id={id} name={name} completed={completed} key={i} />;
            }

            return "";
          })}
      </div>
    </main>
  );
};

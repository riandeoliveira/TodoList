import { TodoContext } from "contexts/TodoContext";
import type { ITodoContext } from "interfaces";
import { useContext, useEffect, useState, type FormEvent } from "react";
import styles from "./styles.module.scss";

export const TodoForm = (): JSX.Element => {
  const { addTodo, todoNameElement } = useContext(TodoContext) as ITodoContext;

  // Estados para armazenar os valores dinâmicos inseridos no input e textarea.
  const [todoName, setTodoName] = useState<string>("");
  const [todoDescription, setTodoDescription] = useState<string>("");

  // Foca no input de texto ao renderizar o componente.
  useEffect(() => {
    todoNameElement.current?.focus();
  }, []);

  // Lida com o envio da nova tarefa. Se a mesma for válida então é adicionada.
  const handleTodoSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (todoNameElement.current?.value.trim().length === 0) {
      alert("Insira um nome para sua tarefa!");
    } else {
      setTodoName("");
      setTodoDescription("");

      addTodo(todoName, todoDescription);
    }
  };

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Nova tarefa</h2>
      <form className={styles.form} onSubmit={handleTodoSubmit}>
        <input
          type="text"
          placeholder="Nome da tarefa..."
          value={todoName}
          ref={todoNameElement}
          className={styles.input}
          onChange={(e) => setTodoName(e.target.value)}
        />
        <textarea
          rows={5}
          placeholder="Descrição da tarefa..."
          value={todoDescription}
          className={styles.textarea}
          onChange={(e) => setTodoDescription(e.target.value)}
        ></textarea>
        <button type="submit" className={styles.button}>
          Adicionar
        </button>
      </form>
    </section>
  );
};

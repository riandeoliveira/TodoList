import { TodoContext } from "contexts/TodoContext";
import type { ITodoContext } from "interfaces";
import {
  useContext,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type RefObject,
} from "react";
import styles from "./styles.module.scss";

export const TodoForm = (): JSX.Element => {
  const { addTodo } = useContext(TodoContext) as ITodoContext;

  const [todoName, setTodoName] = useState<string>("");
  const [todoDescription, setTodoDescription] = useState<string>("");

  const todoNameElement: RefObject<HTMLInputElement> =
    useRef<HTMLInputElement>(null);
  const todoDescriptionElement: RefObject<HTMLTextAreaElement> = useRef(null);

  useEffect(() => {
    todoNameElement.current?.focus();
  }, []);

  const handleTodoSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      todoNameElement.current?.value.trim().length === 0 ||
      todoDescriptionElement.current?.value.trim().length === 0
    ) {
      alert("Preencha os campos de texto para adicionar uma nova tarefa!");
    } else {
      setTodoName("");
      setTodoDescription("");

      addTodo(todoName, todoDescription);
    }
  };

  return (
    <section className={styles.section}>
      <h2>Nova tarefa</h2>
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
          ref={todoDescriptionElement}
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

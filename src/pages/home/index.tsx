import type { NextPage } from "next";
import styles from "./styles.module.scss";

const Home: NextPage = (): JSX.Element => {
  return (
    <div className={styles.layout}>
      <div className={styles.todo_list_container}>
        <div className={styles.todo_list}>
          <header className={styles.header}>
            <h1 className={styles.title}>Lista de Tarefas</h1>
          </header>
          <div>Form</div>
          <div>Todos</div>
        </div>
      </div>
    </div>
  );
};

export default Home;

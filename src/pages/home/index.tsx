import { Header } from "components/Header";
import { TodoForm } from "components/TodoForm";
import { TodoList } from "components/TodoList";
import type { NextPage } from "next";
import styles from "./styles.module.scss";

const Home: NextPage = (): JSX.Element => {
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

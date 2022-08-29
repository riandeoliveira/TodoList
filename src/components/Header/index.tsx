import styles from "./styles.module.scss";

export const Header = (): JSX.Element => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Lista de Tarefas</h1>
    </header>
  );
};

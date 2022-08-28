import { FiEdit, FiInfo, HiOutlineTrash } from "libs/react-icons";
import styles from "./styles.module.scss";

interface TodoProps {
  name: string;
}

export const Todo = ({ name }: TodoProps): JSX.Element => {
  return (
    <div className={`${styles.todo_container} ${styles.completed}`}>
      <div className={styles.todo} tabIndex={0}>
        <span className={styles.name}>{name}</span>
      </div>
      <div className={styles.option_container}>
        <button type="button" title="Abrir tarefa" className={styles.button}>
          <FiInfo size={22} className={styles.icon} />
        </button>
        <button type="button" title="Editar tarefa" className={styles.button}>
          <FiEdit size={22} className={styles.icon} />
        </button>
        <button type="button" title="Remover tarefa" className={styles.button}>
          <HiOutlineTrash size={22} className={styles.icon} />
        </button>
      </div>
    </div>
  );
};

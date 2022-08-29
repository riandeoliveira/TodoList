import { TodoContext } from "contexts/TodoContext";
import type { ITodoContext } from "interfaces";
import { useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import styles from "./styles.module.scss";

// Modal do React Bootstrap. Responsável pela interface da edição de tarefas.

export const TodoModal = () => {
  const {
    modalIsOpen,
    handleCloseModal,
    renameTodo,
    setEditTodoDescription,
    setEditTodoName,
    editTodoName,
    editTodoDescription,
    todoNameElement,
    todoId,
  } = useContext(TodoContext) as ITodoContext;

  return (
    <Modal show={modalIsOpen} onHide={handleCloseModal}>
      <Modal.Header className={styles.modal}>
        <Modal.Title className={styles.title}>
          Altere sua tarefa atual
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.modal}>
        <Form className={styles.form}>
          <input
            type="text"
            placeholder="Nome da tarefa..."
            value={editTodoName}
            ref={todoNameElement}
            className={styles.input}
            onChange={(e) => setEditTodoName(e.target.value)}
          />
          <textarea
            rows={5}
            placeholder="Descrição da tarefa..."
            value={editTodoDescription}
            className={styles.textarea}
            onChange={(e) => setEditTodoDescription(e.target.value)}
          ></textarea>
        </Form>
      </Modal.Body>
      <Modal.Footer className={styles.modal}>
        <Button
          variant="secondary"
          className={styles.button}
          onClick={handleCloseModal}
        >
          Close
        </Button>
        <Button
          variant="primary"
          className={styles.button}
          onClick={() => renameTodo(todoId)}
        >
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

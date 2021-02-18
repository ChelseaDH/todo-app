import styles from "../App.module.css";
import * as React from "react";

type TodoActionsProps = {
    toggleCompleteOnAll: (completed: boolean) => void
    removeAllCompleted: () => void
}

const TodoActions = (props: TodoActionsProps) => {
    return (
        <div className={styles.todoActions}>
            <h1>Actions</h1>
            <button
                className={styles.actionButton}
                onClick={() => props.toggleCompleteOnAll(true)}
            >
                Mark all complete
            </button>
            <button
                className={styles.actionButton}
                onClick={() => props.toggleCompleteOnAll(false)}
            >
                Mark all active
            </button>
            <button
                className={styles.actionButton}
                onClick={props.removeAllCompleted}
            >
                Remove all completed
            </button>
        </div>
    )
}

export default TodoActions;
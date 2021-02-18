import * as React from "react";
import styles from "../App.module.css";

type todoFormProps = {
    addTodo: (text: string) => void,
}

const TodoForm = (props: todoFormProps) => {
    const [todoText, setTodoText] = React.useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!todoText) return;
        props.addTodo(todoText);
        setTodoText("");
    };

    return (
        <form className={styles.todoForm} onSubmit={handleSubmit}>
            <input
                type="text"
                className={styles.newTodoInput}
                placeholder="What needs to be done?"
                value={todoText}
                onChange={e => setTodoText(e.target.value)}
            />
            <input
                type="submit"
                className={styles.addTodoBtn}
                value="Add"
            />
        </form>
    );
}

export default TodoForm;
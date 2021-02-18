import {Todo} from "./TodoContainer";
import styles from "../App.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import * as React from "react";

type todoElementProps = {
    todo: Todo,
    index: number,
    completeTodo: (index: number, completed: boolean) => void,
    removeTodo: (index: number) => void,
}

const TodoElement = (props: todoElementProps): JSX.Element => {
    const completed = props.todo.isCompleted;
    return (
        <div
            className={styles.todo}
        >
            <input
                type="checkbox"
                onClick={() => props.completeTodo(props.index, !completed)}
                checked={completed}
            />
            <div
                className={styles.todoText}
                style={{ textDecoration: completed ? "line-through" : ""}}
            >{props.todo.text}</div>
            <div
                className={styles.removeButton}
                onClick={() => props.removeTodo(props.index)}
            ><FontAwesomeIcon icon={faTimes}/></div>
        </div>
    );
}

export default TodoElement;
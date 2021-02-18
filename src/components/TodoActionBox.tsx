import styles from "../App.module.css";
import * as React from "react";
import Filters from "./Filters";
import RemainingTodos from "./RemainingTodos";
import TodoActions from "./TodoActions";

type TodoActionBoxProps = {
    toggleCompleteOnAll: (completed: boolean) => void
    removeAllCompleted: () => void
    remainingTodos: number
    applyFilter: Function
}

const TodoActionBox = (props: TodoActionBoxProps) => {
    return (
        <div className={styles.todoActionBox}>
            <TodoActions
                toggleCompleteOnAll={props.toggleCompleteOnAll}
                removeAllCompleted={props.removeAllCompleted}
            />
            <Filters
                applyFilter={props.applyFilter}
            />
            <RemainingTodos remainingTodos={props.remainingTodos} />
        </div>
    )
}

export default TodoActionBox;